export interface ProductInterface {
  product_name: string;
  product_description: string;
  tag_line: string;
  dosage: string;
  product_purchasable: boolean;
  indication: string[];
  composition: composition[];
  product_type: product_type[];
  products_images: string[];
  number_of_time_product_purchased?: number;
  comments?: any[];
  id?: string;
}
interface composition {
  name: string;
  quantity: string;
}
interface product_type {
  name: string;
  price: string;
  fake_price: string;
  is_available: boolean;
  product_id: string;
}
