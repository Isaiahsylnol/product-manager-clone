import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { enviroment } from '../../enviroments/enviroment';
import { Product, ProductInLocation, ProductLocation } from 'src/types/types';

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

  async getLocationByCode(location_code: string) {
    const { data, error } = await this.supabase
      .from('Locations')
      .select('code')
      .eq('code', location_code);

    if (error) {
      console.error(error);
      return null;
    }
    return data;
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
      .eq('product_sku', sku);

      if (error) {
        console.error(error);
        return null;
      }
      return data;
  }

  async getProductInLocation(loc: string): Promise<ProductInLocation[] | null> {
    const { data, error } = await this.supabase
      .from('product_locations')
      .select('product_sku, name')
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
  ) {
    // Check if a location already exists for this product
    const { data: productLocation, error: productLocationError } =
      await this.supabase
        .from('product_locations')
        .select('*')
        .eq('product_sku', productSku)
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
          product_sku: productSku,
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
