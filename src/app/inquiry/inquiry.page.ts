import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { SupabaseService } from '../services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.page.html',
  styleUrls: ['./inquiry.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class InquiryPage implements OnInit {
  @ViewChild('inquiryInput', { static: false }) inquiryInput: any;
  showElement = false;
  hideEle = true;
  id: number = 0;
  name: string = '';
  price: number = 0;
  location: Array<String> = [];
  thumbnail: string = '../../assets/no-image-2.jpg';
  inputValue: string = '';
  subscription: any;

  constructor(
    private dataService: SupabaseService,
    private toast: ToastController,
    private router: Router
  ) {}

  async presentToast() {
    const toaster = await this.toast.create({
      message: 'Invalid Sku Entered',
      position: 'middle',
      color: 'warning',
      duration: 2000,
    });
    toaster.present();
  }

  viewProductDetails() {
    const data = {
      name: this.name,
      price: this.price,
      location: this.location,
    };
    this.router.navigate(['/product-details'], { state: data });
  }

  async getProductBySku(event?: any) {
    this.inputValue = event.detail.value;
    const res = await this.dataService.getProductBySku(this.inputValue);
    console.log(res);
    if (res) {
      this.id = Number(res.sku);
      this.name = res.name;
      this.price = res.price;
      this.thumbnail = res.thumbnail;
      this.showElement = true;
      this.hideEle = false;
      this.inquiryInput.value = '';
    } else {
      this.inquiryInput.value = '';
      this.presentToast();
    }
  }
  
  ngOnInit() {}
}
