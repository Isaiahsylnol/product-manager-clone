import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';


@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private firestore: Firestore){

    }
    getProducts() {
        const productsRef = collection(this.firestore, 'products');
        return collectionData(productsRef)
    }
}