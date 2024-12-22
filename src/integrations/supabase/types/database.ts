export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Item {
  id: string
  type: string
  name: string
  location: string | null
  created_at: string
  last_serviced: string | null
}

export interface Report {
  id: string
  user_id: string
  item_id: string
  status: string | null
  created_at: string
  items?: Item
}

export interface User {
  id: string
  phone_number: string
  is_admin: boolean | null
  created_at: string
  sign_up_count: number | null
}