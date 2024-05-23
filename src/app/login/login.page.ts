import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { ToastUtility } from '../utils/toast-utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  input: string = '';

  constructor(private dataService: SupabaseService, private toast: ToastUtility, private router: Router) { }

  async onKeyPress(event: KeyboardEvent): Promise<void> {
    if (event.key === 'Enter') {
      this.loginUser();
    }
  }

  async loginUser(): Promise<void> {
    const user = await this.dataService.loginUser(Number(this.input));
    if (!user) {
      console.log("ERROR");
      this.toast.showToast("Invalid PIN Entered", "warning");
    }
    else{
    localStorage.setItem('userData', JSON.stringify(user));
    this.router.navigate(['/home']);
    }
  }
  ngOnInit() {}
}
