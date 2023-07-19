import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastUtility } from '../utils/toast-utils';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-locate',
  templateUrl: './locate.page.html',
  styleUrls: ['./locate.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})

export class LocatePage implements OnInit {
  @ViewChild('inquiryInput', { static: false }) inquiryInput: any;
  inputValue = '';
  location = '';

  constructor(
    private router: Router,
    private toastUtility: ToastUtility
  ) {}

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.addProductToBunk();
    }
  }
  async addProductToBunk() {
    const inputValue = this.inputValue.trim();
  
    if (!inputValue) {
      this.toastUtility.showToast('Please enter a valid Bunk SKU.', 'warning');
      return;
    }
  
    try {
      const response = await axios.post(`${environment.apiUrl}/bunk`, {
        sku: inputValue,
      });
  
      if (response.data) {
        const loc = await axios.post(`${environment.apiUrl}/locate`, {
          bunkLocationSku: inputValue,
        });
        const state = {
          products: loc.data,
          location: inputValue,
        };
        this.router.navigate(['/maintain-location'], { state });
      }
    } catch (error) {
      this.toastUtility.showToast('Invalid Bunk SKU', 'warning');
      console.log(error);
    }
  }

  ngOnInit() {}
}
