import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { ToastUtility } from '../utils/toast-utils';

@Component({
  selector: 'app-locate',
  templateUrl: './locate.page.html',
  styleUrls: ['./locate.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LocatePage implements OnInit {
  constructor(
    private router: Router,
    private dataService: SupabaseService,
    private toastUtility: ToastUtility
  ) {}
  @ViewChild('inquiryInput', { static: false }) inquiryInput: any;

  inputValue: string = '';
  location: string = '';
  data: any;
  
  showToast() {
    this.toastUtility.showToast('Invalid Location Code', "warning");
  }

  async getLocationByCode(event: any) {
    this.inputValue = event.detail.value;
    this.data = await this.dataService.getLocationByCode(this.inputValue?.toUpperCase());
    if (this.data[0]) {
      this.router.navigate(['/maintain-location'], {
        state: this.data,
      });
    } else {
      console.warn('Invalid Location Code');
      this.showToast();
    }
  }

  ngOnInit() {}
}
