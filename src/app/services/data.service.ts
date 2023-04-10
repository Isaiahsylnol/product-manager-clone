import { Injectable } from '@angular/core';
import { Firestore, collectionData, query, where } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';


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

    getProductBySku(sku: number) {
        const productsRef = query(collection(this.firestore, 'products'), where("sku", "==", sku))
        return collectionData(productsRef)
    }
}