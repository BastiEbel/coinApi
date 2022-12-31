import { Component, OnInit, ViewChild } from '@angular/core';
import { UrlCoinService } from '../services/url-coin.service';
import { RenderService } from '../services/render.service';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { ChartComponent } from '../chart/chart.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild(ChartComponent) chartComponent;
  @ViewChild('nav', { read: DragScrollComponent }) ds: DragScrollComponent;

  constructor(
    public service: UrlCoinService,
    public renderService: RenderService
  ) {}

  ngOnInit(): void {}

  /* *
   *
   * sent click event to the chart
   *
   */
  selectedCoin() {
    if (this.renderService.coinOfDay) {
      this.chartComponent.dailyChart();
    } else if (this.renderService.coinOfWeek) {
      this.chartComponent.weeklyChart();
    } else if (this.renderService.coinOfMonth) {
      this.chartComponent.monthChart();
    }
  }
}
