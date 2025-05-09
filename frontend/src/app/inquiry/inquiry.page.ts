import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
//import { SupabaseService } from '../services/supabase.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/types/types';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.page.html',
  styleUrls: ['./inquiry.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class InquiryPage implements OnInit {
  showElement: boolean = false;
  hideEle: boolean = true;
 
  name: string = '';
  price: number = 0;
  locations: string[] = [];
  thumbnail: string = '';
  inputValue: any = '';
  data: any | undefined;
  sku: string | null = null;

  constructor(
    private http: HttpClient,
    private toast: ToastController,
    private router: Router
  ) {}

  async presentToast(): Promise<void> {
    const toaster = await this.toast.create({
      message: 'Invalid Sku Entered',
      position: 'middle',
      color: 'warning',
      duration: 2000,
    });
    toaster.present();
  }

  viewProductDetails(): void {
    const { name, price, sku, locations, thumbnail } = this;
    const data = { name, price, sku, thumbnail, location: locations };
    console.log(data)
    this.router.navigate(['/product-details'], { state: data });
  }

  async getProductBySku(): Promise<void> {
    const res = await this.http.get<Product>(`${environment.apiUrl}/products/product-search/${this.inputValue}`).toPromise();

    if (!res) {
      this.inputValue = '';
      this.presentToast();
      return;
    }
    this.data = await this.http.get<any>(`${environment.apiUrl}/products/product-locations/${res.sku}`).toPromise();
    
    this.locations = this.data.map(
      (item: { location_id: any }) => item.location_id
    );
    this.sku = res.sku;
    this.name = res.name;
    this.price = res.price;
    this.thumbnail = res?.thumbnail || '../../assets/no-image-2.jpg';
    this.showElement = true;
    this.hideEle = false;
    this.inputValue = '';
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.getProductBySku();
    }
  }

  ngOnInit() {}
}