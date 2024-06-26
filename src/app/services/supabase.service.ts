import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { enviroment } from '../../enviroments/enviroment';
import { User, Product, ProductInLocation, ProductLocation } from 'src/types/types';
interface LocationData {
  code: string;
  // Add other properties if needed
}
@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(
      enviroment.supabaseUrl,
      enviroment.supabaseKey
    );
  }

  async loginUser(pin: number): Promise<User | null> {
    const { data, error } = await this.supabase
    .from('users')
    .select('name, id')
    .eq('pin', pin)
    .single();
  if (error) {
    console.error(error);
    return null;
  }
  return data;
}

async getLocationByCode(location_code: string): Promise<LocationData | null> {
  const { data, error } = await this.supabase
    .from('Locations')
    .select('code')
    .eq('code', location_code);

  if (error) {
    console.error(error);
    return null;
  }

  if (data && data.length > 0) {
    const [{ code }] = data;
    return code;
  } else {
    return null;
  }
}

  async getProductBySku(sku: string): Promise<Product | null>  {
    const { data, error } = await this.supabase
      .from('Products')
      .select('sku, name, price, thumbnail')
      .eq('sku', sku)
      .single();

    if (error) {
      console.error(error);
      return null;
    }
    return data;
  }

  async getProductLocations(sku: string): Promise<ProductLocation[] | null> {
    const { data, error } = await this.supabase
      .from('product_locations')
      .select('location_id')
      .eq('sku', sku);

      if (error) {
        console.error(error);
        return null;
      }
      return data;
  }

   async createPickList(name: string, sku: string): Promise<boolean>{
      const { error: insertError } = await this.supabase
        .from('pick_lists')
        .insert({
          user: 1,
          name: name,
          product: sku,
        });

      if (insertError) {
        console.error('Error creating list: ', insertError);
        return false;
      }
      return true;
  }

  async getPickList(name: string): Promise<any[] | null> {
    const { data, error } = await this.supabase
      .from('pick_lists')
      .select('product, name')
      .eq('name', name);

    if (error) {
      console.error(error);
      return null;
    }
    return data;
  }

  async getProductInLocation(loc: string): Promise<ProductInLocation[] | null> {
    const { data, error } = await this.supabase
      .from('product_locations')
      .select('sku, name')
      .eq('location_id', loc);

    if (error) {
      console.error(error);
      return null;
    }
    return data;
  }
  
  async assignProductToLocation(
    productSku: string,
    prod_name: string,
    location_code: string
  ): Promise<boolean> {
    // Check if a location already exists for this product
    const { data: productLocation, error: productLocationError } =
      await this.supabase
        .from('product_locations')
        .select('*')
        .eq('sku', productSku)
        .eq('location_id', location_code)
        .single();

    if (productLocation) {
      console.error(
        'Error product already exist in location: ',
        productLocation
      );
      return false;
    } else {
      // If a record doesn't exist, create a new one
      const { error: insertError } = await this.supabase
        .from('product_locations')
        .insert({
          sku: productSku,
          name: prod_name,
          location_id: location_code,
        });

      if (insertError) {
        console.error('Error inserting product into location: ', insertError);
        return false;
      }
    }

    return true;
  }
}
