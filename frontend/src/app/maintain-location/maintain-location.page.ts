import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

interface Option {
  url: string;
  title: string;
  products: any | null;
}

interface Product {
  name: string;
  sku: string;
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
  data: { code: string; 'product-sku': string } = { code: '', 'product-sku': '' };
  products: Product = { name: '', sku: '' };

  constructor(private router: Router) {}

  passData(route: string) {
    this.router.navigate([route], { state: this.data });
  }

  ngOnInit() {
    this.data = history.state as { code: string; 'product-sku': string };
    console.log(this.data)
    this.locationId = this.data.code;

    this.options = [
      { title: 'Add to', url: '/fast-find', products: this.data },
      { title: 'Bin cap', url: '/folder/outbox', products: this.data },
      { title: 'Remove From', url: '/remove-product', products: this.data },
      { title: 'View All', url: '/view-all', products: this.data },
      { title: 'Remove All', url: '/folder/archived', products: this.data },
    ];
  }
}
