import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  doc,
  docData,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';

export interface Product {
  sku?: string;
  name: string;
  price: number;
  location: Array<String>;
  thumbnail: string;
}
export interface Location {
  id: string;
  products: Array<string>;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: Firestore) {}
  getProducts() {
    const productsRef = collection(this.firestore, 'products');
    return collectionData(productsRef);
  }

  getProductBySku(sku: string): Observable<Product> {
    const productsRef = doc(this.firestore, `products/${sku}`);
    return docData(productsRef, { idField: 'sku' }) as Observable<Product>;
  }

  getLocation(id: string): Observable<Location> {
    const locationRef = doc(this.firestore, `locations/${id}`);
    return docData(locationRef, { idField: 'id' }) as Observable<Location>;
  }
}
