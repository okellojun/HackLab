-- Table to store summary stats for companies
CREATE TABLE company_stats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  active_problems INT NOT NULL DEFAULT 0,
  total_hackers INT NOT NULL DEFAULT 0,
  hackathons_hosted INT NOT NULL DEFAULT 0,
  bounty_paid DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
  company_id INT NOT NULL,
  FOREIGN KEY (company_id) REFERENCES users(id)
);

-- Table to store summary stats for hackers
CREATE TABLE hacker_stats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  problems_solved INT NOT NULL DEFAULT 0,
  reputation_score DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
  hackathons_won INT NOT NULL DEFAULT 0,
  earnings DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
  hacker_id INT NOT NULL,
  FOREIGN KEY (hacker_id) REFERENCES users(id)
);

-- Table to store recent activities for companies and hackers
CREATE TABLE recent_activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  user_role ENUM('company', 'hacker') NOT NULL,
  activity_type VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table to store upcoming events (hackathons)
CREATE TABLE upcoming_events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  prize DECIMAL(15, 2) NOT NULL,
  created_by INT NOT NULL,
  FOREIGN KEY (created_by) REFERENCES users(id)
);
