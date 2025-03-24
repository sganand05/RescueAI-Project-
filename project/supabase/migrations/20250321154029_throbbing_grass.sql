/*
  # Add storage bucket and missing policies

  1. Storage
    - Create emergency-images bucket
    - Add storage policies for authenticated users

  2. Profiles
    - Add insert policy for profiles table
*/

-- Create storage bucket for emergency images
INSERT INTO storage.buckets (id, name)
VALUES ('emergency-images', 'emergency-images')
ON CONFLICT DO NOTHING;

-- Storage policies for emergency-images bucket
CREATE POLICY "Users can upload emergency images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'emergency-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can read own emergency images"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'emergency-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Add missing insert policy for profiles
CREATE POLICY "Users can insert own profile"
ON profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);