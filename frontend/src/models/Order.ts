export interface Order {
  id: number;
  name: string;
  price?: string;
}

export interface OrderList {
  current_page: number;
  data: OrderItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface OrderItem {
  id: number;
  user_id: number;
  organization_id: number;
  organization: Organization;
  vehicle_id: number;
  vehicle: Vehicle;
  visit_purpose_id: number;
  visit_purpose: Organization;
  place_of_direction_id: number;
  place_of_direction: Organization;
  payment_note_id: null;
  payment_note: Organization | null;
  start_date: Date;
  end_date: Date;
  manager_id: null;
  manager_price: null;
  scanned_at: null;
  record_uuid: string;
  checkpoint_id: null;
  tenure: number;
  record_status_id: number | null;
  record_status: Organization | null;
  calculate_price: string;
  adult_people_in_group: string | null;
  children_people_in_group: string | null;
  student_in_group: string | null;
  tariffs: Tariffs[];
}
export interface Tariffs {
  id: number;
  record_id: number;
  tariff_id: number;
  price: string;
  created_at: Date;
  updated_at: Date;
  tariff: Tariff;
}

export interface Tariff {
  id: number;
  service_id: number;
  price: string;
  is_adult: boolean;
  is_student: boolean;
  is_kid: boolean;
  created_at: Date;
  updated_at: Date;
  service: Organization;
}
export interface Organization {
  id: number;
  name: string;
  address?: string;
  created_at: Date;
  is_required?: boolean;
  updated_at: Date;
  organization_id?: number;
}

export interface Vehicle {
  id: number;
  vehicle_type_id: number;
  value: string;
  number: string;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
