import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProductDetailsPage implements OnInit {
  name: string = "";
  price: number = 0;
  inputValue: any;
  id: number = 0;
 
  thumbnail: any;
  inquiryInput: any;
 

  constructor(private route: ActivatedRoute, private dataService: DataService,
    private toast: ToastController,
    private router: Router) { }
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
      console.log(res)
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
  }

}
