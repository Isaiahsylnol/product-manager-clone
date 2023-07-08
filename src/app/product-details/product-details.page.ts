import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

interface Product {
  sku: string;
  name: string;
  price: number;
  thumbnail: string;
  description: string;
}

interface Location {
  sku: string;
}
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ProductDetailsPage implements OnInit {
  locations: Array<Location> = [];
  thumbnail: string = '../../assets/no-image-2.jpg';
  product!: Product;

  constructor() {}

  ngOnInit() {
    this.product = history.state.product;
    this.locations = history.state.location;
  }
}
