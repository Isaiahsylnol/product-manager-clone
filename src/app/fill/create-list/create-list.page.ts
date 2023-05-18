import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SupabaseService } from 'src/app/services/supabase.service';
import { ToastUtility } from '../../utils/toast-utils';
@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.page.html',
  styleUrls: ['./create-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CreateListPage implements OnInit {
  hideEle: boolean = true;
  products: Array<any> = [];
  inputValue: string = '';
  inputListName: string = '';
  res: any;
  val: string = "JOHN"

  constructor(
    private dataService: SupabaseService,
    private toastUtility: ToastUtility,
  ) {}

  showToast() {
    this.toastUtility.showToast('Invalid Sku Entered', 'warning');
  }

  async createPickList(): Promise<void> {
    if(!this.inputListName){
      this.inputListName = this.val;
    }
    const regexPattern = /^(\d{2,3})-(\d{4})$/; // Regex pattern for "132-2222 and 43-3333"

    if (!regexPattern.test(this.inputValue)) {
      this.showToast();
      return;
    }

     this.res = await this.dataService.getProductBySku(this.inputValue);
    if (this.inputValue) this.products.push(this.res);
 
   this.dataService.createPickList(this.inputListName, this.res.sku);
    this.inputValue = '';
    this.hideEle = false;
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.createPickList();
    }
  }

 ngOnInit() {}
}
