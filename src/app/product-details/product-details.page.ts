import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';

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
  name: string = "";
  price: number = 0;
  inputValue: any;
  id: number = 0;
  location: Array<Product> = []
  thumbnail: any;

  constructor(private dataService: DataService,
    private toast: ToastController) { }

  async presentToast() {
    const toaster = await this.toast.create({
      message: 'Invalid Sku Entered',
      position: 'middle',
      color: 'warning',
      duration: 2000,
    });
    toaster.present();
  }

  getProductBySku(event: any) {
    this.inputValue = event.detail.value;
    this.dataService.getProductBySku(event.detail.value).subscribe((res) => {
    
      if (res) {
        this.id = Number(res.sku);
        this.name = res.name;
        this.price = res.price;
      this.thumbnail = res.thumbnail
        this.inquiryInput.value = '';
      } else {
        this.inquiryInput.value = '';
        this.presentToast();
      }
    });
  }

  ngOnInit() {
    const data = history.state;
    this.name = data.name;
    this.price = data.price;
    this.location = data.location;
  }

}
