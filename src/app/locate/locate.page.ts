import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locate',
  templateUrl: './locate.page.html',
  styleUrls: ['./locate.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LocatePage implements OnInit {
  @ViewChild('inquiryInput', { static: false }) inquiryInput: any;

  inputValue: string = '';

  constructor(private dataService: DataService, private router: Router) {}
  getLocation(event: any) {
    this.inputValue = event.detail.value;
    this.dataService.getLocation(this.inputValue).subscribe((res) => {
      if (res) {
        const data = { location: res };
        //alert("route to details");
        this.router.navigate(['/fast-find'], { state: data });
        this.inquiryInput.value = '';
      } else {
        this.inquiryInput.value = '';
      }
    });
  }

  ngOnInit() {}
}
