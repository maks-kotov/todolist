import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nslzkgronwalemabhchh.supabase.co'
const supabaseAnonKey = 'sb_publishable_LREcTfp-pW9ZlRFVW7u7rQ_D7caoarM'

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)