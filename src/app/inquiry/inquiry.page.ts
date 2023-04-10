import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DataService } from '../services/data.service';

interface Prod {

}
@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.page.html',
  styleUrls: ['./inquiry.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class InquiryPage implements OnInit {
  
  showElement = false;
  hideEle = true
  id: number = 0;
  name: string = '';
  price: number = 0;
  thumbnail: string = '../../assets/no-image-2.jpg';
  inputValue: number = 0;

  constructor(private dataService: DataService) { }

  myFunction(event: any){
    this.inputValue = Number(event.detail.value);
    this.dataService.getProductBySku(this.inputValue).subscribe(res => {
      console.log(res);
      this.price = res[0]['price'];
      this.thumbnail = res[0]['thumbnail'];
      this.name = res[0]['name'];
      this.showElement = true;
      this.hideEle = false
    })
  }
  ngOnInit() {
  }

}
