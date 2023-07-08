import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastUtility } from '../utils/toast-utils';
import axios from 'axios';
import { environment } from 'src/enviroments/environment';

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
    console.log(this.inputValue)

    try {
      const response = await axios.post(`${environment.apiUrl}/bunk`, {
        sku: this.inputValue,
      });
      console.log(response.data)

      if (response.data) {
        const state = {
          products: response.data,
          location: this.inputValue,
        };
        this.router.navigate(['/maintain-location'], { state });
      } else {
        this.toastUtility.showToast('Invalid Location Code', 'warning');
      }
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit() {}
}
