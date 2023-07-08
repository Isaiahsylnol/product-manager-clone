import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ToastUtility } from '../utils/toast-utils';
import { environment } from '../../enviroments/environment';
import axios from 'axios';

@Component({
  selector: 'app-fast-find',
  templateUrl: './fast-find.page.html',
  styleUrls: ['./fast-find.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class FastFindPage implements OnInit {
  products: any;
  locationId = '';
  data: any;
  @ViewChild('inquiryInput', { static: false }) inquiryInput: any;
  
  constructor(private toastUtility: ToastUtility) {}

  async addProductToLocation() {
    try {
      const response = await axios.post(`${environment.apiUrl}/fast-find`, {
        locSku: this.locationId,
        prodSku: this.inquiryInput.value,
      });
      if (response.data) {
        this.toastUtility.showToast('Product added to location', 'success');
      } else {
        this.toastUtility.showToast('Failed to add product to location', 'warning');
      }
    } catch (error) {
      console.error('Error adding product to location:', error);
    }
    this.inquiryInput.value = '';
  }

  async getBunkProducts(id: string) {
    try {
      const response = await axios.post(`${environment.apiUrl}/locate`, {
        bunkLocationSku: id,
      });
      if (response.data) {
        return response.data;
      } else {
        console.log('Invalid Location Code');
      }
    } catch (error) {
      console.error('Error fetching bunk products:', error);
    }
  }

  async ngOnInit() {
    this.data = history.state;
    this.locationId = this.data.location;
    this.products = await this.getBunkProducts(this.locationId);
  }
}