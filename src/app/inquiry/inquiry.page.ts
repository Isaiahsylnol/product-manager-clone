import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
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
    private dataService: DataService,
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
    const data = { name: this.name, price: this.price, location: this.location}
    //alert("route to details");
    this.router.navigate(['/product-details'], {state: data});
  }

  getProductBySku(event: any) {
    this.inputValue = event.detail.value;
    this.dataService.getProductBySku(event.detail.value).subscribe((res) => {
      console.log(res)
      if (res) {
        this.id = Number(res.sku);
        this.name = res.name;
        this.price = res.price;
        this.thumbnail = res.thumbnail
        this.location = res.location
        this.showElement = true;
        this.hideEle = false;
        this.inquiryInput.value = '';
        console.log(this.location)
      } else {
        this.inquiryInput.value = '';
        this.presentToast();
      }
    });
  }
  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
