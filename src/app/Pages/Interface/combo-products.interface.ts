export interface ComboProductInterface {
  product_name: string;
  product_description: string;
  price: number;
  fake_price: number;
  tag_line: string;
  dosage: string;
  product_purchasable: boolean;
  products: products[];
  products_images: string[];
  number_of_time_product_purchased?: number;
  comments?: any[];
  id?: string;
}
export interface products {
  id: string;
  product_id: string;
}
