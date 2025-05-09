import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
//import { SupabaseService } from '../services/supabase.service';
import { ToastUtility } from '../utils/toast-utils';
@Component({
  selector: 'app-fast-find',
  templateUrl: './fast-find.page.html',
  styleUrls: ['./fast-find.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})

export class FastFindPage implements OnInit {
  products: any;
  locationId: string = '';
  inputValue: string = '';
  data: any;
  constructor(
    //private dataService: SupabaseService,
    private toastUtility: ToastUtility,
  ) {}

  getLocation(event: any) {
    this.inputValue = event.detail.value;
  //  this.dataService.getLocationByCode(this.inputValue);
  }

  async addProductToLocation(event: any) {
    this.inputValue = event.detail.value;
    if (this.inputValue) {
    //  let res =  await this.dataService.assignProductToLocation(
    //     {"sku": this.inputValue, "location_id": this.locationId}
    //   );
    //  if(res){
    //  } else {
    //   this.toastUtility.showToast(res.message, 'warning');
    //  }
    this.toastUtility.showToast("Product inserted into location", 'success');
    } else {
      console.warn('Invalid Product Sku');
      this.toastUtility.showToast('Invalid Product Sku', 'warning');
    }
  }

  async ngOnInit() {
    const data = history.state;
    this.locationId = data['code'];
  //  this.products = await this.dataService.getProductInLocation(this.locationId);
  }
}