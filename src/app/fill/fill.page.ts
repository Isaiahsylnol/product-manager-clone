import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
interface Option {
  url: string;
  title: string;
}
@Component({
  selector: 'app-fill',
  templateUrl: './fill.page.html',
  styleUrls: ['./fill.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class FillPage implements OnInit {
  public options!: Array<Option>;

  constructor() {}

  ngOnInit() {
    this.options = [
      { title: 'Create List', url: 'create-list' },
      { title: 'Hole Checker', url: '/' },
      { title: 'Fast Checker', url: '/' },
      { title: 'Work With Pick List', url: '/' },
    ];
  }
}
