import { getSupabaseClient } from './supabase'

export const uploadFile = async (file, path) => {
  try {
    const supabase = await getSupabaseClient()

    const { data, error } = await supabase.storage
      .from('rags.store.by.lee')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Upload error:', error)
      throw error
    }

    return await getPublicUrl(path)
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

export const deleteFile = async (path) => {
  try {
    const supabase = await getSupabaseClient()

    const { error } = await supabase.storage
      .from('rags.store.by.lee')
      .remove([path])

    if (error) {
      console.error('Delete error:', error)
      throw error
    }
  } catch (error) {
    console.error('Error deleting file:', error)
    throw error
  }
}

export const getPublicUrl = async (path) => {
  try {
    const supabase = await getSupabaseClient()
    const { data: { publicUrl } } = supabase.storage
      .from('rags.store.by.lee')
      .getPublicUrl(path)
    
    return publicUrl
  } catch (error) {
    console.error('Error getting public URL:', error)
    throw error
  }
} 