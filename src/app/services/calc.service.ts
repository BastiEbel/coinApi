import { Injectable } from '@angular/core';
import { RenderService } from './render.service';

@Injectable({
  providedIn: 'root',
})
export class CalcService {
  amountField: any = 1;
  sum: number;
  isReadonly: boolean = true;
  constructor(private renderService: RenderService) {}

  calcNewOne() {
    setTimeout(() => {
      this.amountField = 1;
      this.sum = this.renderService.currentCoin['current_price'];
    }, 500);
    return (this.isReadonly = true);
  }

  calculate() {
    if (this.isReadonly) {
      this.sum =
        this.amountField * this.renderService.currentCoin['current_price'];
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
