import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service.service';
import { ToastUtility } from '../utils/toast-utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
  standalone: true,
})
export class LoginComponent implements OnInit {
  inputValue: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private toastUtility: ToastUtility
  ) {}

  async login() {
    try {
      const res = await axios.post(`${environment.apiUrl}/login`, {
        pin: this.inputValue,
      });

      if (!res.data) {
        console.warn('Invalid credentials');
      }
      const { id, name } = res.data;
      // After successful login
      this.userService.setUser(id, name);
      localStorage.setItem('userData', JSON.stringify(res.data));
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Login failed.');
      this.toastUtility.showToast('Invalid credentials', 'warning');
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.login();
    }
  }
  ngOnInit() {}
}
