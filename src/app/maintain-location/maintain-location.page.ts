import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

interface Option {
  url: string;
  title: string;
}

interface Product {
  name: string,
  sku: string
}
@Component({
  selector: 'app-maintain-location',
  templateUrl: './maintain-location.page.html',
  styleUrls: ['./maintain-location.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MaintainLocationPage implements OnInit {
  public options!: Array<Option>;
  locationId: string = '';
  data: any;
  products: Product  = { name: "", sku: ""} 

  constructor(private router: Router) {}

  passData(route: string) {
    this.router.navigate([route], { state: this.data });
  }

  ngOnInit() {
    this.data = history.state;
    this.products = this.data;
    this.locationId = this.data['code'];
    this.options = [
      { title: 'Add to', url: '/fast-find' },
      { title: 'Bin cap', url: '/folder/outbox' },
      { title: 'Remove From', url: '/remove-product' },
      { title: 'View All', url: '/view-all' },
      { title: 'Remove All', url: '/folder/archived' },
    ];
  }
}
