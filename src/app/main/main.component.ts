import { Component, OnInit, ViewChild } from '@angular/core';
import { UrlCoinService } from '../services/url-coin.service';
import { RenderService } from '../services/render.service';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { ChartComponent } from '../chart/chart.component';
import { CalcService } from '../services/calc.service';
import { BalanceComponent } from '../balance/balance.component';
import { PercentageSortService } from '../services/percentage-sort.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild(ChartComponent) chartComponent;
  @ViewChild(BalanceComponent) balanceComponent;
  @ViewChild('nav', { read: DragScrollComponent }) ds: DragScrollComponent;

  constructor(
    public service: UrlCoinService,
    public percentageSort: PercentageSortService,
    private renderService: RenderService,
    private calcService: CalcService
  ) {}

  ngOnInit(): void {}

  /* *
   *
   * sent click event to the chart
   *
   */
  selectedCoin() {
    try {
      if (this.renderService.coinOfDay) {
        this.chartComponent.dailyChart();
      } else if (this.renderService.coinOfWeek) {
        this.chartComponent.weeklyChart();
      } else if (this.renderService.coinOfMonth) {
        this.chartComponent.monthChart();
      }
      if (this.calcService.isReadonly) {
        this.calcService.calcNewOne();
      } else {
        this.calcService.switchCalculate();
      }
      this.percentageSort.shortValue();
    } catch (err) {
      console.error(err);
    }
  }

  drawNewChart() {
    try {
      this.chartComponent.dailyChart();
      this.balanceComponent.showData();
    } catch (err) {
      console.error(err);
    }
  }
}
