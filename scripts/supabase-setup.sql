-- ============================================
-- DreamIT Statistics - Supabase Database Setup
-- Prefix: statistics_
-- ============================================

-- 1. User Profiles Table (statistics_user_profiles)
CREATE TABLE IF NOT EXISTS statistics_user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'member',
  signup_domain TEXT,
  visited_sites TEXT[] DEFAULT '{}',
  last_sign_in_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE statistics_user_profiles ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
CREATE POLICY "Users can view own profile"
  ON statistics_user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON statistics_user_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON statistics_user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 4. Auto-create profile on signup trigger
CREATE OR REPLACE FUNCTION statistics_handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.statistics_user_profiles (id, email, display_name, avatar_url, signup_domain, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', ''),
    COALESCE(NEW.raw_user_meta_data->>'signup_domain', ''),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    display_name = COALESCE(EXCLUDED.display_name, statistics_user_profiles.display_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, statistics_user_profiles.avatar_url),
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Create trigger
DROP TRIGGER IF EXISTS on_statistics_auth_user_created ON auth.users;
CREATE TRIGGER on_statistics_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION statistics_handle_new_user();

-- 6. User status check function
CREATE OR REPLACE FUNCTION check_user_status(target_user_id UUID, current_domain TEXT)
RETURNS JSON AS $$
DECLARE
  user_record RECORD;
BEGIN
  SELECT * INTO user_record FROM statistics_user_profiles WHERE id = target_user_id;
  IF NOT FOUND THEN
    RETURN json_build_object('status', 'active');
  END IF;
  RETURN json_build_object('status', 'active');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
