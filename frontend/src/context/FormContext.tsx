import { createFormContext } from "@mantine/form";

export interface FormValues {
  adult_people_in_group: number;
  children_people_in_group: number;
  student_in_group: number;
  tenure: number;
  vehicle_id: number | null;
  vehicle_type_id: number | null;
  car_brand: string | null;
  number: string | null;
  payment_note_id: number;
  visit_purpose_id: number | null;
  place_of_direction_id: number | null;
  services: number[];
  start_date: Date;
  end_date: Date;
}

// You can give context variables any name
export const [OrderFormProvider, useOrderFormContext, useOrderForm] =
  createFormContext<FormValues>();
