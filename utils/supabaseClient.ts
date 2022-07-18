import { createClient} from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_API_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_API_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)