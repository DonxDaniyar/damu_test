export interface Service {
  id: number;
  name: string;
  is_required: boolean;
  prices: Price[];
  checked?: boolean;
  price?: number;
}

export interface Price {
  id: number;
  price: string;
  is_adult: boolean;
  is_student: boolean;
  is_kid: boolean;
}
