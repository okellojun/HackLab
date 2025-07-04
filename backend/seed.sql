-- Seed data for users table
INSERT INTO users (id, username, email, password, role) VALUES
(1, 'TechCorp', 'contact@techcorp.com', 'hashedpassword1', 'company'),
(2, 'Alex', 'alex@example.com', 'hashedpassword2', 'hacker');

-- Seed data for company_stats
INSERT INTO company_stats (active_problems, total_hackers, hackathons_hosted, bounty_paid, company_id) VALUES
(24, 1247, 15, 45230.00, 1);

-- Seed data for hacker_stats
INSERT INTO hacker_stats (problems_solved, reputation_score, hackathons_won, earnings, hacker_id) VALUES
(12, 4.8, 3, 2340.00, 2);

-- Seed data for recent_activities
INSERT INTO recent_activities (user_id, user_role, activity_type, description, created_at) VALUES
(1, 'company', 'solution_submitted', 'New solution submitted for "API Rate Limiting"', NOW() - INTERVAL 2 HOUR),
(1, 'company', 'hackathon_started', 'Hackathon "Mobile Innovation" started', NOW() - INTERVAL 1 DAY),
(1, 'company', 'problem_posted', 'Problem "Data Visualization" posted', NOW() - INTERVAL 3 DAY),
(2, 'hacker', 'hackathon_won', 'Won 1st place in "AI Innovation Challenge"', NOW() - INTERVAL 1 DAY),
(2, 'hacker', 'solution_submitted', 'Submitted solution for "Database Optimization"', NOW() - INTERVAL 2 DAY),
(2, 'hacker', 'team_joined', 'Joined team for "Cybersecurity Challenge"', NOW() - INTERVAL 3 DAY);

-- Seed data for upcoming_events
INSERT INTO upcoming_events (title, start_date, prize, created_by) VALUES
('Global AI Hackathon', CURDATE() + INTERVAL 2 DAY, 10000.00, 1),
('Blockchain Solutions', CURDATE() + INTERVAL 5 DAY, 5000.00, 1),
('Mobile Innovation', CURDATE() + INTERVAL 7 DAY, 7500.00, 1);
