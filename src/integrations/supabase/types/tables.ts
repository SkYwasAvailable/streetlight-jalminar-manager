import { Item, Report, User } from './database'

export interface Database {
  public: {
    Tables: {
      items: {
        Row: Item
        Insert: Omit<Item, 'id' | 'created_at'>
        Update: Partial<Omit<Item, 'id'>>
      }
      reports: {
        Row: Report
        Insert: Omit<Report, 'id' | 'created_at'>
        Update: Partial<Omit<Report, 'id'>>
      }
      users: {
        Row: User
        Insert: Omit<User, 'created_at' | 'sign_up_count'>
        Update: Partial<Omit<User, 'id'>>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']