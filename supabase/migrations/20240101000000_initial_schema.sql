-- Create required extensions and schemas
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "http";

-- Drop existing net schema if it exists, then create pg_net extension
DROP SCHEMA IF EXISTS net CASCADE;
CREATE EXTENSION IF NOT EXISTS "pg_net";

-- Grant permissions on net schema (created by pg_net extension)
GRANT USAGE ON SCHEMA net TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA net TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA net TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA net TO anon, authenticated;

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT,
  description TEXT,
  image_url TEXT,
  gallery JSONB DEFAULT '[]',
  tech_stack JSONB DEFAULT '[]',
  category VARCHAR(100),
  timeline VARCHAR(100),
  role VARCHAR(100),
  client VARCHAR(100),
  live_url TEXT,
  github_url TEXT,
  status VARCHAR(50) DEFAULT 'planning',
  problem TEXT,
  solution TEXT,
  results JSONB DEFAULT '[]',
  features JSONB DEFAULT '[]',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  tags JSONB DEFAULT '[]',
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255),
  company VARCHAR(255),
  content TEXT NOT NULL,
  avatar_url TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  proficiency INTEGER CHECK (proficiency >= 0 AND proficiency <= 100),
  icon VARCHAR(255),
  description TEXT,
  projects_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data
INSERT INTO projects (title, subtitle, description, tech_stack, category, timeline, role, client, github_url, status, featured) VALUES
('Todo Pro — Web task manager', 'Kichik jamoalar uchun professional vazifalar boshqaruv tizimi', 'Todo Pro - bu zamonaviy web-based task management tizimi bo''lib, kichik va o''rta jamoalar uchun mo''ljallangan.', '["React", "Node.js", "WebSocket", "MongoDB", "Express"]', 'Full Stack', '3 oy', 'Full Stack Developer', 'StartupHub', 'https://github.com/orazali/todo-pro', 'completed', true),
('Shoply — E-commerce dashboard', 'Savdogarlar uchun admin dashboard', 'Savdogarlar uchun admin dashboard. React, Tailwind CSS va Supabase yordamida ishlab chiqilgan.', '["React", "Tailwind", "Supabase", "Chart.js"]', 'Web', '2 oy', 'Frontend Developer', 'E-commerce Co', 'https://github.com/orazali/shoply', 'in_progress', false),
('MobTrade — Mobile marketplace', 'Hybrid mobile app marketplace', 'Hybrid mobile app marketplace. React Native va Firebase yordamida yaratilgan mobil ilova.', '["React Native", "Firebase", "Redux", "Expo"]', 'Mobile', '4 oy', 'Mobile Developer', 'TechStart', 'https://github.com/orazali/mobtrade', 'completed', true);

INSERT INTO skills (name, category, proficiency, description) VALUES
('React', 'Frontend', 90, 'Zamonaviy React hooks va context API bilan professional darajada ishlash'),
('JavaScript', 'Frontend', 85, 'ES6+ xususiyatlari va zamonaviy JavaScript development'),
('Node.js', 'Backend', 80, 'Server-side JavaScript development va API yaratish'),
('Tailwind CSS', 'Frontend', 88, 'Utility-first CSS framework bilan tez va samarali styling'),
('Supabase', 'Backend', 75, 'Backend-as-a-Service platformasi bilan ishlash'),
('React Native', 'Mobile', 70, 'Cross-platform mobile app development');

INSERT INTO testimonials (name, position, company, content, rating, featured) VALUES
('Komil Abdullayev', 'Startup Founder', 'StartupHub', 'O''razali bilan hamkorlik juda samarali bo''ldi. Loyihani muddatida va sifatli yetkazib berdi.', 5, true),
('Mavluda Karimova', 'Product Manager', 'TechCorp', 'UI dizayn hamda frontend implementation juda professional.', 5, true),
('Firuza Toshmatova', 'CTO', 'DevCompany', 'Kod toza va hujjatlangan, deployment jarayoni muammosiz o''tdi.', 5, false);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Public can read projects') THEN
    CREATE POLICY "Public can read projects" ON projects FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'blog_posts' AND policyname = 'Public can read published blog posts') THEN
    CREATE POLICY "Public can read published blog posts" ON blog_posts FOR SELECT USING (published = true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'testimonials' AND policyname = 'Public can read testimonials') THEN
    CREATE POLICY "Public can read testimonials" ON testimonials FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'skills' AND policyname = 'Public can read skills') THEN
    CREATE POLICY "Public can read skills" ON skills FOR SELECT USING (true);
  END IF;
END $$;

-- Create policy for contact messages (only insert allowed for public)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'contact_messages' AND policyname = 'Public can insert contact messages') THEN
    CREATE POLICY "Public can insert contact messages" ON contact_messages FOR INSERT WITH CHECK (true);
  END IF;
END $$;