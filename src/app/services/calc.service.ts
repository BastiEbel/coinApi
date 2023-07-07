import { Injectable } from '@angular/core';
import { RenderService } from './render.service';

@Injectable({
  providedIn: 'root',
})
export class CalcService {
  amountField: any = 1;
  sum: any;
  isReadonly: boolean = true;
  constructor(private renderService: RenderService) {
  }

  calcNewOne() {
    this.amountField = 1;
    setTimeout(() => {
      let shortSum = this.renderService.currentCoin['current_price'];
      this.sum = shortSum.toFixed(2);
      this.isReadonly = true;
    }, 1000);
    return this.isReadonly;
  }

  calculate() {
    if (this.isReadonly) {
      let shortSum =
        this.amountField * this.renderService.currentCoin['current_price'];
      this.sum = shortSum.toFixed(2);
    } else {
      let decimal = this.sum / this.renderService.currentCoin['current_price'];
      this.amountField = decimal.toFixed(5);
    }
  }

  switchCalculate() {
    setTimeout(() => {
      this.sum = this.amountField;
      let decimal = this.sum / this.renderService.currentCoin['current_price'];
      this.amountField = decimal.toFixed(5);
    }, 500);

    return (this.isReadonly = false);
  }
}
