export interface User {
  id: number;
  name: string;
}
export interface ProductLocation {
    location_id: string;
  }
  
  export interface Product {
    sku: string;
    name: string;
    price: number;
    thumbnail: string;
  }
  export interface ProductInLocation {
    sku: string;
    name: string;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
  }