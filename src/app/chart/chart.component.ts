import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { UrlCoinService } from '../services/url-coin.service';
import { RenderService } from '../services/render.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, AfterViewInit {
  myChart: any;

  @ViewChild('myChart') canvas: ElementRef;
  constructor(
    public service: UrlCoinService,
    public renderService: RenderService,
    private cdref: ChangeDetectorRef
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dailyChart();
    this.cdref.detectChanges();
  }
  /**
   * This function is for rendering daily prices
   *
   */
  async dailyChart() {
    try {
      this.renderService.coinOfDay = true;
      this.renderService.coinOfWeek = false;
      this.renderService.coinOfMonth = false;
      this.clearChart();
      await this.renderService.dailyCoinPrice();
      setTimeout(() => {
        this.drawChart();
      }, 250);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * This function is for rendering weekly prices
   *
   */
  async weeklyChart() {
    try {
      this.renderService.coinOfDay = false;
      this.renderService.coinOfWeek = true;
      this.renderService.coinOfMonth = false;
      this.clearChart();
      await this.renderService.weeklyCoinPrice();
      this.drawChart();
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * This function is for rendering month prices
   *
   */
  async monthChart() {
    try {
      this.renderService.coinOfDay = false;
      this.renderService.coinOfWeek = false;
      this.renderService.coinOfMonth = true;
      this.clearChart();
      await this.renderService.monthCoinPrice();
      this.drawChart();
    } catch (err) {
      console.error(err);
    }
  }

  clearChart() {
    this.renderService.coinPrice = [];
    this.renderService.coindate = [];
    if (this.myChart) {
      this.myChart.destroy();
    }
  }

  /**
   *
   * @returns give the color back
   * this function is for the background color by the Chart
   */
  canvasColor() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    let gradientFill = ctx.createLinearGradient(0, 20, 100, 800);
    gradientFill.addColorStop(0.225, 'transparent');
    gradientFill.addColorStop(1, '#13e2a4');
    ctx.borderColor = 'green';
    ctx.backgroundColor = gradientFill;
    ctx.strokeStyle = gradientFill;

    return gradientFill;
  }

  /**
   * this function renders the Chart
   *
   */
  drawChart() {
    this.myChart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: this.renderService.coindate,
        datasets: [
          {
            label: `24h View ${this.renderService.coinName}`,
            data: this.renderService.coinPrice,
            borderWidth: 2,
            fill: true,
            pointRadius: 2,
            pointStyle: 'point',
            backgroundColor: this.canvasColor(),
            pointBackgroundColor: 'transparent',
            pointBorderWidth: 1,
            borderColor: '#f5f5f5',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            ticks: {
              color: '#f5f5f5',
            },
          },
          x: {
            ticks: {
              color: '#f5f5f5',
            },
          },
        },
        plugins: {
          legend: {
            display: false,
            labels: {
              color: '#f5f5f5',
            },
          },
        },
      },
    });
  }
}
