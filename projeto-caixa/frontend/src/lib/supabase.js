import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://djzpmleqmxmixsfmbrkv.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqenBtbGVxbXhtaXhzZm1icmt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3NDkyMjcsImV4cCI6MjA3ODMyNTIyN30.vlKwK8p735s-G1pvhq3SEvDhEIjpg9esua4PXHg4oEA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
