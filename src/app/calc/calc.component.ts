import { Component, OnInit } from '@angular/core';
import { CalcService } from '../services/calc.service';
import { RenderService } from '../services/render.service';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss'],
})
export class CalcComponent implements OnInit {
  imgSrc = '/assets/icons/circle.png';
  activeAnimate: boolean = false;

  constructor(
    public renderService: RenderService,
    public calcService: CalcService
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    setTimeout(() => {
      this.calcService.calcNewOne();
    }, 200);
  }

  /**
   * function sent value from input to variable
   * @param event
   * @returns
   */
  sendNewAmount(event) {
    try {
      this.calcService.amountField = event.target.value;
      return this.calcService.amountField;
    } catch (err) {
      console.error(err);
    }
  }

  calcNewQuantity(event) {
    try {
      this.calcService.sum = event.target.value;
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * calculate the value
   *
   */
  exchange() {
    try {
      this.calcService.calculate();
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * switch the value
   *
   */
  changeValue() {
    try {
      this.activeAnimate = true;
      if (!this.calcService.isReadonly) {
        this.calcService.calcNewOne();
        setTimeout(() => {
          this.activeAnimate = false;
        }, 1500);
      } else {
        this.calcService.switchCalculate();
        setTimeout(() => {
          this.activeAnimate = false;
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    }
  }
}
