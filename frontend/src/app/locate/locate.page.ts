import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastUtility } from '../utils/toast-utils';
import { ProductData } from 'src/types/types';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-locate',
  templateUrl: './locate.page.html',
  styleUrls: ['./locate.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LocatePage implements OnInit {
  @ViewChild('inquiryInput', { static: false }) inquiryInput!: ElementRef;

  inputLocation: string = '';
  inputSku: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastUtility: ToastUtility,
  ) {}

  ngOnInit(): void {}

  // Method to validate the input to allow only numbers and hyphen
  validateInput(event: KeyboardEvent): boolean {
    const char = event.key;
    const regex = /^[0-9\-]$/;

    if (!regex.test(char)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  // Method to fetch product's locations by SKU
  async getLocationsBySku(): Promise<void> {
    console.log(this.inputLocation)
    try {
      const res = await this.http.get<ProductData>(`${environment.apiUrl}/locate/bunk/${this.inputLocation}`).toPromise();
      
      if (!res) {
        this.toastUtility.showToast('Invalid Location Code', 'warning');
      } else {
      const data = await this.http.get<any>(`${environment.apiUrl}/locate/bunk/${this.inputLocation}`).toPromise();

        this.router.navigate(['/maintain-location'], {
                  state: { code: this.inputLocation, data },
                });
      }
    } catch (error) {
      console.error('Error fetching product by SKU:', error);
      this.toastUtility.showToast('Error fetching product by SKU', 'warning');
    } finally {
      this.inputSku = '';
    }
  }
}
