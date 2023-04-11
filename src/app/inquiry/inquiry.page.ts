import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.page.html',
  styleUrls: ['./inquiry.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class InquiryPage implements OnInit {
  
  @ViewChild('inquiryInput', { static: false }) inquiryInput: any;
  showElement = false;
  hideEle = true
  id: number = 0;
  name: string = '';
  price: number = 0;
  thumbnail: string = '../../assets/no-image-2.jpg';
  inputValue: string = "";
  subscription: any;

  constructor(private dataService: DataService) { }

  getProductBySku(event: any){
    this.inputValue = event.detail.value;
    this.dataService.getProductBySku(event.detail.value).subscribe(res => {
     if(res){
      console.log(res);  
     this.id = Number(res.sku);
   this.name = res.name;
   this.price = res.price 
   this.showElement = true;
      this.hideEle = false
      this.inquiryInput.value = '';
     } else{
      this.name ="Failed to find sku"
      this.showElement = true;
      this.hideEle = false
      this.inquiryInput.value = '';
     }
    })
  }
  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
