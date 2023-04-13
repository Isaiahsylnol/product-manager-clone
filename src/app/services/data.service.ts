import { Injectable } from '@angular/core';
import { Firestore, collectionData, doc, docData } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';

export interface Product {
    sku?: string;
    name: string;
    price: number; 
    thumbnail: string;
}

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private firestore: Firestore){

    }
    getProducts() {
        const productsRef = collection(this.firestore, 'products');
        return collectionData(productsRef);
    }

    getProductBySku(sku: string): Observable<Product>  {
        const productsRef = doc(this.firestore, `products/${sku}`);
        return docData(productsRef, {idField: 'sku'}) as Observable<Product>
    }
}