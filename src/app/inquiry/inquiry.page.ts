import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastUtility } from '../utils/toast-utils';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';

interface Product {
  sku: string;
  name: string;
  price: number;
  thumbnail: string;
  description: string;
}
@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.page.html',
  styleUrls: ['./inquiry.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class InquiryPage implements OnInit {
  showElement: boolean = false;
  hideEle: boolean = true;
  locations: string[] = [];
  thumbnail: string = '../../assets/no-image-2.jpg';
  inputValue: string = '';
  obj!: Product;

  constructor(private toastUtility: ToastUtility, private router: Router) {}

  viewProductDetails(): void {
    const state = {
      product: this.obj,
      location: this.locations,
    };
    this.router.navigate(['/product-details'], { state });
  }

  async getProductBySku() {
    this.inputValue = this.inputValue.trim();

    try {
      const response = await axios.post(`${environment.apiUrl}/product`, {
        sku: this.inputValue,
      });

      if (response.data) {
        this.obj = response.data;
        const bunks = response.data.productLocations.map(
          (productLocation: { bunk: any }) => productLocation.bunk.sku
        );
        this.locations = [...bunks];
      } else {
        this.toastUtility.showToast('Invalid SKU Entered', 'warning');
      }
    } catch (error) {
      console.error(error);
    }
    this.showElement = true;
    this.hideEle = false;
    this.inputValue = '';
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.getProductBySku();
    }
  }

  ngOnInit() {}
}
