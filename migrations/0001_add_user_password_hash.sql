ALTER TABLE "user"
ADD COLUMN IF NOT EXISTS "password_hash" text;
