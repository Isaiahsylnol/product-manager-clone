import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-remove-product',
  templateUrl: './remove-product.page.html',
  styleUrls: ['./remove-product.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RemoveProductPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
