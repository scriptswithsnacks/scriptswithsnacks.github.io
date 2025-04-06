-- Simple SQL script to create the subscribers table in Supabase

-- Drop the table if it exists to start fresh
DROP TABLE IF EXISTS public.subscribers;

-- Create the subscribers table
CREATE TABLE public.subscribers (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Set up row level security (RLS)
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert data
CREATE POLICY "Allow anonymous inserts" 
ON public.subscribers 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Grant necessary permissions
GRANT INSERT ON public.subscribers TO anon;
GRANT USAGE ON SEQUENCE public.subscribers_id_seq TO anon; 