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
 
  constructor(private dataService: SupabaseService) { }

  async ngOnInit() {
    const data = history.state;
    this.locationId = data['code'];
    this.locations = data['locations'];
    this.productSku = data['product-sku'];

    if (this.locationId) {
      this.dataService.getProductInLocation(this.locationId).subscribe(
        (products) => {
          this.products = products || [];
          this.count = this.products.length;
        },
        (error) => {
          console.error("Error in component fetching products:", error);
        }
      );
    } else if (this.productSku) {
      this.count = this.locations.length;
    } else {
      return
    }
  }
}
