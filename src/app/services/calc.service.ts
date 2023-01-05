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
      this.sum = this.renderService.currentPrice;
    }, 500);
    return (this.isReadonly = true);
  }

  calculate() {
    if (this.isReadonly) {
      this.sum = this.amountField * this.renderService.currentPrice;
    } else {
      let decimal;
      decimal = this.sum / this.renderService.currentPrice;
      this.amountField = decimal.toFixed(5);
    }
  }

  switchCalculate() {
    setTimeout(() => {
      let decimal;
      this.sum = this.amountField;
      decimal = this.sum / this.renderService.currentPrice;
      this.amountField = decimal.toFixed(5);
    }, 500);

    return (this.isReadonly = false);
  }
}
