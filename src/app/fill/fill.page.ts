import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
interface Option {
  url: string;
  title: string;
}
@Component({
  selector: 'app-fill',
  templateUrl: './fill.page.html',
  styleUrls: ['./fill.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class FillPage implements OnInit {

  public options!: Array<Option>;

  constructor() { }

  ngOnInit() {

 this.options = [
      { title: 'Create List', url: '/inquiry'},
      { title: 'Hole Checker', url: '/folder/outbox'},
      { title: 'Fast Checker', url: '/folder/favorites'},
      { title: 'Work With Pick List', url: '/folder/archived'},
    ];
  }
}
