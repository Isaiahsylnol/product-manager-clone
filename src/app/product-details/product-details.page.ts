import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SupabaseService } from '../services/supabase.service';

interface Product {
  location: Array<String>
}
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class ProductDetailsPage implements OnInit {
  @ViewChild('inquiryInput', { static: false }) inquiryInput: any;
 
  location: Array<Product> = []
  id: number = 0;
  name: string = '';
  price: number = 0;
  locations: Array<String> = [];
  thumbnail: string = '../../assets/no-image-2.jpg';
  inputValue: string = '';
  data: any;
  sku: any;

  constructor(private dataService: SupabaseService) { }
 
  async getProductBySku(event?: any) {
    this.inputValue = event.detail.value;
    const res = await this.dataService.getProductBySku(this.inputValue);
    if (res) {
      this.data = await this.dataService.getProductLocations(res.sku);
      for (let location in this.data) {
        this.locations.push(this.data[location]['location_id']);
      }
      this.id = Number(res.sku);
      this.name = res.name;
      this.price = res.price;
      this.thumbnail = res.thumbnail;
      this.inquiryInput.value = '';
    } else {
      this.inquiryInput.value = '';
    }
  }

  ngOnInit() {
    const data = history.state;
    this.sku = data.sku;
    this.name = data.name;
    this.price = data.price;
    this.thumbnail = data.thumbnail;
    this.location = data.location;
  }
}
