-- Add fullname to users
ALTER TABLE users ADD COLUMN IF NOT EXISTS fullname TEXT;
