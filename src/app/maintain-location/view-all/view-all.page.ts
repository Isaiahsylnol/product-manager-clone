import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.page.html',
  styleUrls: ['./view-all.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewAllPage implements OnInit {
  products: any;
  data: any;
  count: number = 0;
  locationId: string = '';
  productSku: string = '';
  locations: String[] = [];
 
  constructor(private dataService: SupabaseService,) { }

  async ngOnInit() {
    const data = history.state;
    // console.log(data)
    this.locationId = data['code'];
    this.locations = data['locations'];
    this.productSku = data['product-sku'];

    // Check if locationId exists and is truthy
    if (this.locationId) {
        this.products = await this.dataService.getProductInLocation(this.locationId);
        this.count = this.products.length;
      } 
    // Check if productSku exists and is truthy
    else if (this.productSku) {
        this.count = this.locations.length;
    } 
    // If neither locationId nor productSku exist
    else {
        console.log("NO DATA");
    }
}

}
