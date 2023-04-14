import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-fast-find',
  templateUrl: './fast-find.page.html',
  styleUrls: ['./fast-find.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class FastFindPage implements OnInit {
  products: Array<string> = [];
  locationId: string = '';
  inputValue: string = '';
  constructor(private dataService: DataService) {}

  ngOnInit() {
    const data = history.state;
    this.products = data.location.products;
    this.locationId = data.location.id;

    console.log(this.products);
  }
}
