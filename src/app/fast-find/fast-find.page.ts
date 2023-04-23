import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SupabaseService } from '../services/supabase.service';
import { ToastUtility } from '../utils/toast-utils';
@Component({
  selector: 'app-fast-find',
  templateUrl: './fast-find.page.html',
  styleUrls: ['./fast-find.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class FastFindPage implements OnInit {
  products: Array<any> = [];
  locationId: string = '';
  inputValue: string = '';
  data: any;
  constructor(
    private dataService: SupabaseService,
    private toastUtility: ToastUtility
  ) {}

  showToast() {
    this.toastUtility.showToast('Invalid Product Sku', 'warning');
  }

  getLocation(event: any) {
    this.inputValue = event.detail.value;
    this.dataService.getLocationByCode(this.inputValue);
  }

  async addProductToLocation(event: any) {
    this.inputValue = event.detail.value;
    const res = await this.dataService.getProductBySku(this.inputValue);

    if (res) {
      this.dataService.assignProductToLocation(
        res.sku,
        res.name,
        this.locationId
      );
    } else {
      console.warn('Invalid Product Sku');
      this.showToast();
    }
  }

  async getLocProducts(loc: string) {
    this.data = await this.dataService.getProductInLocation(loc);
    for (let product in this.data) {
      this.products.push({
        name: this.data[product]['name'],
        sku: this.data[product]['product_sku'],
      });
    }
  }

  ngOnInit() {
    const data = history.state;
    this.locationId = data[0]['code'];
    this.getLocProducts(data[0]['code']);
  }
}
