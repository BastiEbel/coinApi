import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { UrlCoinService } from '../services/url-coin.service';
import zoomPlugin from 'chartjs-plugin-zoom';
import { RenderService } from '../services/render.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  coinName: any = 'Bitcoin';
  chart: any;
  isactive = false;

  p = 1;

  pages = Array(Math.ceil(100 / 2))
    .fill(null)
    .map((_, i) => ({ label: i, value: i }));

  @ViewChild('myChart') canvas: ElementRef;

  constructor(
    public service: UrlCoinService,
    public renderService: RenderService
  ) {
    Chart.register(...registerables);
    Chart.register(zoomPlugin);
  }

  ngOnInit(): void {
    this.renderData();
  }

  ngAfterViewInit() {}

  /**
   *
   * @param event it`s important to switch the page
   *
   */
  onPageEvent(event: any) {
    this.p = event;
  }

  renderData() {
    this.renderService.getData();
    this.getDailyData();
  }

  /**
   *
   * this function give the first data to the chart if is load
   */
  async getDailyData() {
    await this.service.getPriceDaily().then((price) => {
      this.renderService.ctxResult = price['prices'].map((coin: any) => coin);
      this.renderService.coinPrice = this.renderService.ctxResult.map(
        (currentCoin: any) => currentCoin['1']
      );
    });
    this.renderService.getDailyTime();
    this.renderChart();
  }

  /**
   *
   * @param id give the id to the service and put it in the url
   *
   */
  selectedCoin(id) {
    this.service.data$ = this.coinName;
    for (let i = 0; i < this.renderService.result.length; i++) {
      if (id == this.renderService.result[i]['id']) {
        this.service.data$ = id;
        this.coinName = this.renderService.result[i]['name'];
      }
    }
    this.renderCurrentPrice();
  }

  /**
   *
   * @returns give the color back
   * this function is for the background color by the Chart
   */
  canvasColor() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    let gradientFill = ctx.createLinearGradient(0, 20, 300, 800);
    gradientFill.addColorStop(0.1, '#13e2a4');
    gradientFill.addColorStop(0.8, '#e902b3');
    gradientFill.addColorStop(1, '#e902b3');
    ctx.borderColor = 'green';
    ctx.backgroundColor = gradientFill;
    ctx.strokeStyle = gradientFill;

    return gradientFill;
  }

  /**
   * this function renders the current price in the  big chart
   *
   */
  renderChart() {
    this.chart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: this.renderService.coindate,
        datasets: [
          {
            label: `24h View ${this.coinName}`,
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
        scales: {
          y: {
            ticks: {
              color: '#f5f5f5',
            },
          },
          x: {
            beginAtZero: true,
            ticks: {
              color: '#f5f5f5',
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: '#f5f5f5',
            },
          },
        },
      },
    });
  }
  /**
   * this function updates the chart
   *
   */
  renderCurrentPrice() {
    this.chart.destroy();
    this.renderService.changeChart();
    this.renderChart();
    this.chart.render();
  }
}
