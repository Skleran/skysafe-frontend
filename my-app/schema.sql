-- SQL Script to set up SkySafe Database Tables and Policies
-- Copy and run this script in the SQL Editor of your Supabase Dashboard.

-- ========================================================
-- 1. Create or Update contact_submissions Table
-- ========================================================
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamptz DEFAULT now() NOT NULL,
    full_name text NOT NULL,
    organization text,
    email text NOT NULL,
    message text NOT NULL,
    lang text DEFAULT 'tr' NOT NULL,
    status text DEFAULT 'pending' NOT NULL,
    notes text
);

-- In case the table already exists, add status and notes columns if missing
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending' NOT NULL;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS notes text;

-- ========================================================
-- 2. Create or Update investor_submissions Table
-- ========================================================
CREATE TABLE IF NOT EXISTS public.investor_submissions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamptz DEFAULT now() NOT NULL,
    full_name text NOT NULL,
    organization text,
    email text NOT NULL,
    investor_type text NOT NULL,
    lang text DEFAULT 'tr' NOT NULL,
    status text DEFAULT 'pending' NOT NULL,
    notes text
);

-- In case the table already exists, add status and notes columns if missing
ALTER TABLE public.investor_submissions ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending' NOT NULL;
ALTER TABLE public.investor_submissions ADD COLUMN IF NOT EXISTS notes text;

-- ========================================================
-- 3. Enable Row Level Security (RLS)
-- ========================================================
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investor_submissions ENABLE ROW LEVEL SECURITY;

-- ========================================================
-- 4. Re-create Security Policies
-- ========================================================

-- Clean up old policies to avoid duplication errors
DROP POLICY IF EXISTS "Allow public insert contact" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated all contact" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow public insert investor" ON public.investor_submissions;
DROP POLICY IF EXISTS "Allow authenticated all investor" ON public.investor_submissions;

-- A. Policies for contact_submissions:
-- Allow anyone (even unauthenticated) to submit a contact form
CREATE POLICY "Allow public insert contact" 
    ON public.contact_submissions
    FOR INSERT 
    WITH CHECK (true);

-- Allow only logged-in (authenticated) admin users to manage contact submissions
CREATE POLICY "Allow authenticated all contact" 
    ON public.contact_submissions
    FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

-- B. Policies for investor_submissions:
-- Allow anyone (even unauthenticated) to submit an investor application
CREATE POLICY "Allow public insert investor" 
    ON public.investor_submissions
    FOR INSERT 
    WITH CHECK (true);

-- Allow only logged-in (authenticated) admin users to manage investor submissions
CREATE POLICY "Allow authenticated all investor" 
    ON public.investor_submissions
    FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);
