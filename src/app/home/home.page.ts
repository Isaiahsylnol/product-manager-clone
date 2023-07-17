import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, RouterLinkActive,]
})
export class HomePage implements OnInit {

  public pages = [
    {
      title: 'Inquiry',
      url: 'inquiry',
      icon: 'search',
      md: 'search-sharp',
      iosIcon: 'search',
    },
    {
      title: 'Locate It',
      url: 'locate',
      icon: 'location',
      md: 'location-sharp',
      iosIcon: 'location',
    },
    {
      title: 'Sign It',
      url: 'sign-it',
      icon: 'pricetag',
      md: 'pricetag-sharp',
      iosIcon: 'pricetag',
    },
    {
      title: 'Fill It',
      url: 'fill',
      icon: 'file-tray-full',
      md: 'file-tray-full-sharp',
      iosIcon: 'file-tray-full',
    },
  ];

  constructor() {}

  ngOnInit() {
  }

}
