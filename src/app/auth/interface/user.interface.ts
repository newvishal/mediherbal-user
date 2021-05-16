export interface User {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  cart?: any[];
  number_of_times_order_Places?: number;
  id?: string;
  userType:string;
  password?:string
}
