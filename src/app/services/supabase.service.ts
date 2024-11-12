import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { enviroment } from '../../enviroments/enviroment';
import { User, Product, ProductInLocation, ProductLocation, LocationData, ApiResponse } from 'src/types/types';
import { catchError, from, map, Observable, of } from 'rxjs';
interface Inquiry {
  sku: string;
  loc: string;
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
    .from('Users')
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
    .select('location_id')
    .eq('location_id', location_code);

  if (error) {
    console.error(error);
    return null;
  }

  if (data && data.length > 0) {
    const [{ location_id }] = data;
    return location_id;
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
      .from('Product_locations')
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

  getProductInLocation(loc: string): Observable<ProductInLocation[] | null> {
    return from(this.supabase
      .from('Product_locations')
      .select('sku, name')
      .eq('location_id', loc)).pipe(
        map(response => {
          if (response.error) {
            console.error(response.error);
            return null;
          }
          console.log(response)
          return response.data;
        }),
        catchError(error => {
          console.error("Error fetching product data:", error);
          return of(null);
        })
    );
  }

async assignProductToLocation({ sku, location_id }: { sku: string; location_id: string }): Promise<any> {
  // Check if a location already exists for this product
  let prod = await this.getProductBySku(sku)
 
  const { data: productLocation, error: productLocationError } =
    await this.supabase
      .from('Product_locations')
      .select('*')
      .eq('sku', sku)
      .eq('location_id', location_id)
      .single();

  if (productLocation) {
    console.error(
      'Error product already exist in location: ',
      productLocation
    );
    return {success: false,
      message: "Error product already exist in location",
      data: null};
  } 
  else {
    // If a record doesn't exist, create a new one
    const { error: insertError } = await this.supabase
      .from('Product_locations')
      .insert({
        sku,
        name: prod?.name,
        location_id: location_id,
      });

    if (insertError) {
      console.error('Error inserting product into location: ', insertError);
      return {success: false,
        message: "Error inserting product into location",
        data: null};
    }
  }
  return {success: true,
    message: "Successfully inserted product into location",
    data: null};
}}
