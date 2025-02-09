import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastUtility } from '../utils/toast-utils';
import { LocationData, ProductData } from 'src/types/types';

@Component({
  selector: 'app-locate',
  templateUrl: './locate.page.html',
  styleUrls: ['./locate.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LocatePage implements OnInit {
  @ViewChild('inquiryInput', { static: false }) inquiryInput!: ElementRef;

  // Variables for user inputs and fetched data
  inputLocation: string = '';
  inputSku: string = '';

  constructor(
    private router: Router,
   // private dataService: SupabaseService,
    private toastUtility: ToastUtility,
  ) {}

  ngOnInit(): void {}

  // Method to fetch location's products
  async getLocationProducts(): Promise<void> {
    try {
      // Fetch location data using the provided location code
    //  const data: LocationData | null = await this.dataService.getLocationByCode(this.inputLocation.toUpperCase());

      // if (data) {
      //   // Navigate to the maintain-location page with the fetched location code
      //   this.router.navigate(['/maintain-location'], {
      //     state: { code: data },
      //   });
      // } else {
      //   console.warn('Invalid Location Code');
      //   this.toastUtility.showToast('Invalid Location Code', 'warning');
      // }
    } catch (error) {
      console.error('Error fetching location:', error);
      this.toastUtility.showToast('Error fetching location', 'warning');
    } finally {
      this.inputLocation = '';
    }
  }

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
    try {
   //   const res: ProductData | null = await this.dataService.getProductBySku(this.inputSku);
      
      // if (!res) {
      //   // Show a warning toast if the SKU is invalid
      //   this.toastUtility.showToast('Invalid Product SKU', 'warning');
      // } else {
      //   // Fetch locations associated with the product SKU
      //   const data = await this.dataService.getProductLocations(res.sku);
      //   const locations = data?.map((item: { location_id: string }) => item.location_id);

      //   // Navigate to the view-all page with the product SKU and locations
      //   this.router.navigate(['/view-all'], {
      //     state: { 'product-sku': res.sku, locations: locations },
      //   });
      // }
    } catch (error) {
      console.error('Error fetching product by SKU:', error);
      this.toastUtility.showToast('Error fetching product by SKU', 'warning');
    } finally {
      this.inputSku = '';
    }
  }
}
