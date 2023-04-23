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
  name: string = '';
  price: number = 0;
  inputValue: any;
  location: Array<Product> = []
  thumbnail: any;

  constructor(private dataService: SupabaseService) { }
 
  async getProductBySku(event: any) {
    this.inputValue = event.detail.value;
    const res = await this.dataService.getProductBySku(this.inputValue);
  }

  ngOnInit() {
    const data = history.state;
    this.name = data.name;
    this.price = data.price;
    this.location = data.location;
  }
}
