import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UserService } from './shared/user.service.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule],
})

export class AppComponent {
userName: string = '';
user: any = {};

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
  ];

  constructor(private userService: UserService) {
    this.userService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  logOut() {
    localStorage.removeItem("userData");
    this.userService.setUser(0,"");
  }

  checkUserLoggedIn() {
    const userData = localStorage.getItem('userData');
    return userData ? true : false
  }
}
