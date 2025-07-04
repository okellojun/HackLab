require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'reborntechhacklab',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper function to generate JWT token
function generateToken(user) {
  return jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
}

// Register endpoint
app.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query('INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)', [username, email, hashedPassword, role]);
    const user = { id: result.insertId, username, role };
    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ message: 'Username or email already exists' });
    } else {
      res.status(500).json({ message: 'Server error', error });
    }
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Missing username or password' });
  }
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = generateToken(user);
    res.json({ user: { id: user.id, username: user.username, role: user.role }, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET || 'secretkey', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Example protected route
app.get('/profile', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, username, email, role FROM users WHERE id = ?', [req.user.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'User not found' });
    // Fetch additional profile data
    const user = rows[0];

    const [profileRows] = await pool.query('SELECT name, title, location, joinDate, avatar, rating, problemsSolved, hackathonsWon, totalEarnings, bio FROM hacker_profiles WHERE user_id = ?', [req.user.id]);
    const profile = profileRows[0] || {};

    const [skillsRows] = await pool.query('SELECT skill FROM hacker_skills WHERE user_id = ?', [req.user.id]);
    const skills = skillsRows.map(row => row.skill);

    const [achievementsRows] = await pool.query('SELECT title, date, prize FROM hacker_achievements WHERE user_id = ?', [req.user.id]);
    const achievements = achievementsRows;

    const [recentProblemsRows] = await pool.query('SELECT title, status, bounty, company FROM recent_problems WHERE user_id = ?', [req.user.id]);
    const recentProblems = recentProblemsRows;

    const [socialRows] = await pool.query('SELECT github, linkedin, website FROM hacker_social WHERE user_id = ?', [req.user.id]);
    const social = socialRows[0] || {};

    res.json({
      ...user,
      ...profile,
      skills,
      achievements,
      recentProblems,
      social
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

app.get('/analytics', authenticateToken, async (req, res) => {
  try {
    // Total problems posted
    const [problemsResult] = await pool.query('SELECT COUNT(*) AS totalProblems FROM problems');
    const totalProblems = problemsResult[0]?.totalProblems || 0;

    // Active hackers count (distinct users who solved problems)
    const [activeHackersResult] = await pool.query('SELECT COUNT(DISTINCT user_id) AS activeHackers FROM solutions');
    const activeHackers = activeHackersResult[0]?.activeHackers || 0;

    // Hackathons hosted count
    const [hackathonsResult] = await pool.query('SELECT COUNT(*) AS hackathonsHosted FROM hackathons');
    const hackathonsHosted = hackathonsResult[0]?.hackathonsHosted || 0;

    // Total bounty paid
    const [bountyResult] = await pool.query('SELECT IFNULL(SUM(bounty), 0) AS totalBounty FROM solutions');
    const totalBounty = bountyResult[0]?.totalBounty || 0;

    // Recent activity (last 5 activities)
    const [recentActivity] = await pool.query(
      "SELECT a.action, p.title, u.username AS hacker, a.bounty, a.time " +
      "FROM activity a " +
      "LEFT JOIN problems p ON a.problem_id = p.id " +
      "LEFT JOIN users u ON a.user_id = u.id " +
      "ORDER BY a.time DESC " +
      "LIMIT 5"
    );

    // Top hackers (top 5 by problems solved)
    const [topHackers] = await pool.query(
      "SELECT u.username AS name, COUNT(s.id) AS solved, IFNULL(SUM(s.bounty), 0) AS earnings, AVG(u.rating) AS rating " +
      "FROM users u " +
      "LEFT JOIN solutions s ON u.id = s.user_id " +
      "GROUP BY u.id " +
      "ORDER BY solved DESC " +
      "LIMIT 5"
    );

    res.json({
      stats: [
        { label: 'Total Problems Posted', value: totalProblems, change: '', icon: 'Code', color: 'bg-blue-500' },
        { label: 'Active Hackers', value: activeHackers, change: '', icon: 'Users', color: 'bg-green-500' },
        { label: 'Hackathons Hosted', value: hackathonsHosted, change: '', icon: 'Trophy', color: 'bg-purple-500' },
        { label: 'Total Bounty Paid', value: `$${totalBounty}`, change: '', icon: 'DollarSign', color: 'bg-yellow-500' }
      ],
      recentActivity,
      topHackers
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Problems endpoint
app.get('/problems', authenticateToken, async (req, res) => {
  try {
    const [problems] = await pool.query(
      'SELECT id, title, description, category, difficulty, bounty, deadline, submissions, status FROM problems WHERE status != "Draft"'
    );
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Dashboard endpoint
app.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    // Company stats
    const [activeProblemsResult] = await pool.query('SELECT COUNT(*) AS activeProblems FROM problems WHERE status = "Active"');
    const activeProblems = activeProblemsResult[0]?.activeProblems || 0;

    const [totalHackersResult] = await pool.query('SELECT COUNT(*) AS totalHackers FROM users WHERE role = "hacker"');
    const totalHackers = totalHackersResult[0]?.totalHackers || 0;

    const [hackathonsHostedResult] = await pool.query('SELECT COUNT(*) AS hackathonsHosted FROM hackathons');
    const hackathonsHosted = hackathonsHostedResult[0]?.hackathonsHosted || 0;

    const [bountyPaidResult] = await pool.query('SELECT IFNULL(SUM(bounty), 0) AS bountyPaid FROM solutions');
    const bountyPaid = bountyPaidResult[0]?.bountyPaid || 0;

    // Hacker stats
    const [problemsSolvedResult] = await pool.query('SELECT COUNT(*) AS problemsSolved FROM solutions WHERE user_id = ?', [req.user.id]);
    const problemsSolved = problemsSolvedResult[0]?.problemsSolved || 0;

    const [reputationScoreResult] = await pool.query('SELECT reputation FROM users WHERE id = ?', [req.user.id]);
    const reputationScore = reputationScoreResult[0]?.reputation || 0;

    const [hackathonsWonResult] = await pool.query('SELECT COUNT(*) AS hackathonsWon FROM hackathon_winners WHERE user_id = ?', [req.user.id]);
    const hackathonsWon = hackathonsWonResult[0]?.hackathonsWon || 0;

    const [earningsResult] = await pool.query('SELECT IFNULL(SUM(bounty), 0) AS earnings FROM solutions WHERE user_id = ?', [req.user.id]);
    const earnings = earningsResult[0]?.earnings || 0;

    // Recent activity (last 5 activities)
    const [recentActivity] = await pool.query(
      "SELECT a.action, p.title, u.username AS hacker, a.bounty, a.time " +
      "FROM activity a " +
      "LEFT JOIN problems p ON a.problem_id = p.id " +
      "LEFT JOIN users u ON a.user_id = u.id " +
      "ORDER BY a.time DESC " +
      "LIMIT 5"
    );

    // Upcoming events (next 5 hackathons)
    const [upcomingEvents] = await pool.query(
      "SELECT id, name, start_date, prize FROM hackathons WHERE start_date >= CURDATE() ORDER BY start_date ASC LIMIT 5"
    );

    res.json({
      companyStats: [
        { label: 'Active Problems', value: activeProblems, icon: 'Code', color: 'bg-blue-500' },
        { label: 'Total Hackers', value: totalHackers, icon: 'Users', color: 'bg-green-500' },
        { label: 'Hackathons Hosted', value: hackathonsHosted, icon: 'Trophy', color: 'bg-purple-500' },
        { label: 'Bounty Paid', value: `$${bountyPaid}`, icon: 'DollarSign', color: 'bg-yellow-500' }
      ],
      hackerStats: [
        { label: 'Problems Solved', value: problemsSolved, icon: 'Target', color: 'bg-green-500' },
        { label: 'Reputation Score', value: reputationScore, icon: 'Star', color: 'bg-yellow-500' },
        { label: 'Hackathons Won', value: hackathonsWon, icon: 'Trophy', color: 'bg-purple-500' },
        { label: 'Earnings', value: `$${earnings}`, icon: 'DollarSign', color: 'bg-blue-500' }
      ],
      recentActivity,
      upcomingEvents
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Hackathons endpoint
app.get('/hackathons', authenticateToken, async (req, res) => {
  try {
    const [hackathons] = await pool.query(
      'SELECT id, title, description, startDate, endDate, type, participants, maxParticipants, prize, status, location FROM hackathons'
    );
    res.json(hackathons);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Register endpoint
app.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const [existingUser] = await pool.query('SELECT id FROM users WHERE username = ? OR email = ?', [username, email]);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'Username or email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, role]
    );
    const user = { id: result.insertId, username, email, role };
    const token = jwt.sign(user, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Dashboard endpoint
app.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    if (userRole === 'company') {
      // Fetch company stats
      const [companyStatsRows] = await pool.query(
        'SELECT active_problems, total_hackers, hackathons_hosted, bounty_paid FROM company_stats WHERE company_id = ?',
        [userId]
      );
      const companyStats = companyStatsRows[0] || {
        active_problems: 0,
        total_hackers: 0,
        hackathons_hosted: 0,
        bounty_paid: 0,
      };

      // Fetch recent activities
      const [recentActivities] = await pool.query(
        'SELECT activity_type, description, created_at FROM recent_activities WHERE user_id = ? AND user_role = ? ORDER BY created_at DESC LIMIT 5',
        [userId, 'company']
      );

      // Fetch upcoming events
      const [upcomingEvents] = await pool.query(
        'SELECT title, start_date, prize FROM upcoming_events WHERE created_by = ? ORDER BY start_date ASC LIMIT 5',
        [userId]
      );

      res.json({
        stats: {
          activeProblems: companyStats.active_problems,
          totalHackers: companyStats.total_hackers,
          hackathonsHosted: companyStats.hackathons_hosted,
          bountyPaid: companyStats.bounty_paid,
        },
        recentActivities,
        upcomingEvents,
      });
    } else if (userRole === 'hacker') {
      // Fetch hacker stats
      const [hackerStatsRows] = await pool.query(
        'SELECT problems_solved, reputation_score, hackathons_won, earnings FROM hacker_stats WHERE hacker_id = ?',
        [userId]
      );
      const hackerStats = hackerStatsRows[0] || {
        problems_solved: 0,
        reputation_score: 0,
        hackathons_won: 0,
        earnings: 0,
      };

      // Fetch recent activities
      const [recentActivities] = await pool.query(
        'SELECT activity_type, description, created_at FROM recent_activities WHERE user_id = ? AND user_role = ? ORDER BY created_at DESC LIMIT 5',
        [userId, 'hacker']
      );

      // Fetch upcoming events (hackathons)
      const [upcomingEvents] = await pool.query(
        'SELECT title, start_date, prize FROM upcoming_events ORDER BY start_date ASC LIMIT 5'
      );

      res.json({
        stats: {
          problemsSolved: hackerStats.problems_solved,
          reputationScore: hackerStats.reputation_score,
          hackathonsWon: hackerStats.hackathons_won,
          earnings: hackerStats.earnings,
        },
        recentActivities,
        upcomingEvents,
      });
    } else {
      res.status(400).json({ message: 'Invalid user role' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
