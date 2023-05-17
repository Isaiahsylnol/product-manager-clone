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
 
  constructor(private dataService: SupabaseService,) { }

  async ngOnInit() {
    const data = history.state;
    this.locationId = data[0]['code'];
    this.products = await this.dataService.getProductInLocation(this.locationId);
    this.count = this.products.length;
  }
}
