import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule],
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: 'home',
      icon: 'home',
      md: 'home-sharp',
      iosIcon: 'home',
    },
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
    {
      title: 'Log Out',
      url: '/folder/trash',
      icon: 'lock-closed',
      md: 'lock-closed-sharp',
      iosIcon: 'lock-closed',
    },
  ];

  constructor() {}
}
