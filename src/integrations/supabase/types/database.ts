export interface Item {
  id: string;
  type: 'Street Light' | 'Jalminar';
  name: string;
  location: string | null;
  last_serviced: string | null;
  created_at: string | null;
}

export interface Report {
  id: string;
  user_id: string | null;
  item_id: string | null;
  status: 'Problem' | 'Technician Assigned' | 'Solved' | null;
  created_at: string | null;
  items?: Item;
}

export interface User {
  id: string;
  email: string;
  is_admin: boolean | null;
  created_at: string | null;
  sign_up_count: number | null;
}