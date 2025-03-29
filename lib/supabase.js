import { createClient } from '@supabase/supabase-js'
import { auth } from './firebase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Function to get Supabase client with Firebase token
export const getSupabaseClient = async () => {
  const user = auth.currentUser
  if (!user) {
    throw new Error('No authenticated user')
  }

  const token = await user.getIdToken()
  
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  })
} 