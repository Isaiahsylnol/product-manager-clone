import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.page.html',
  styleUrls: ['./view-all.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewAllPage implements OnInit {
  showElement: boolean = false;
  hideEle: boolean = true;
  products: any = [];
  data: any;
  count: number = 0;
  locationId: string = '';
 
  constructor() {}

  async ngOnInit() {
    const data = history.state;

    this.locationId = data.location
    this.products = data.products.products
    this.count = this.products.length;

    if(this.count){
      this.hideEle = false;
      this.showElement = true;
    }
  }
}
