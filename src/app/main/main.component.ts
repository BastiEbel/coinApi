import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { UrlCoinService } from '../services/url-coin.service';
import zoomPlugin from 'chartjs-plugin-zoom';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  result: any = [];
  ctxResult: any = [];
  coinPrice: object = {};
  coinName: any = 'Bitcoin';
  coindate: any = [];
  chart: any;
  isactive = false;
  date = new Date();
  p = 1;
  pages = Array(Math.ceil(100 / 2)).fill(null).map((_, i) => ({ label: i, value: i }));

  @ViewChild('myChart') canvas: ElementRef;

  constructor(public service: UrlCoinService) {
    Chart.register(...registerables);
    Chart.register(zoomPlugin);
  }

  ngOnInit(): void {
    this.getData();
  }

  /**
   *
   * @param event it`s important to switch the page
   *
   */
  onPageEvent(event: any) {
    this.p = event;
  }

  /**
   * this function gets the data from the service
   *
   */
  async getData() {
    await this.service.getFullList().then((res) => {
      this.result = res;
      this.service.data$ = this.coinName;
      console.log('result', res);
    });
    this.getDailyData();
  }

  /**
   *
   * this function give the first data to the chart if is load
   */
  async getDailyData() {
    let currentDate: any = [];
    let timestamp;
    await this.service.getPriceDaily().then((price) => {
      console.log(price);
      this.ctxResult = price['prices'].map((coin: any) => coin);
      this.coinPrice = this.ctxResult.map((currentCoin: any) => currentCoin['1']);
      for (let i = 0; i < this.ctxResult.length; i++) {
        timestamp = this.ctxResult[i]['0'];
        let timeFormat: any = { formatMatcher: 'basic', hour: 'numeric', minute: 'numeric', hourCycle: 'h24' };
        currentDate = new Date(timestamp).toLocaleTimeString('de', timeFormat);
        this.coindate.push(currentDate);
      }
      this.renderPrice();
    });

  }

  /**
   *
   * this function update the Chart with the new query
   */
  async changeChart() {
    await this.service.getDailyCoins().then((newPrice) => {
      this.ctxResult = newPrice['prices'].map((coin: any) => coin);
      this.coinPrice = this.ctxResult.map((currentCoin: any) => currentCoin['1']);
    });
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

    return gradientFill
  }

  /**
   *
   * @param id give the id to the service and put it in the url
   *
   */
  selectedCoin(id) {
    this.service.data$ = this.coinName;
    for (let i = 0; i < this.result.length; i++) {
      if (id == this.result[i]['id']) {
        this.service.data$ = id;
        this.coinName = this.result[i]['name'];
      }
    }
    this.renderCurrentPrice();
  }

  /**
   * this function renders the current price in the chart
   *
   */
  renderPrice() {
    this.chart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: this.coindate,
        datasets: [{
          label: `24h View ${this.coinName}`,
          data: this.coinPrice,
          borderWidth: 2,
          fill: true,
          pointRadius: 2,
          pointStyle: 'point',
          backgroundColor: this.canvasColor(),
          pointBackgroundColor: 'transparent',
          pointBorderWidth: 1,
          borderColor: '#f5f5f5',
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            ticks: {
              color: '#f5f5f5'
            }
          },
          x: {
            beginAtZero: true,
            ticks: {
              color: '#f5f5f5'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: "#f5f5f5"
            }
          }
        }
      }
    });
  }

  /**
   * this function updates the chart
   *
   */
  async renderCurrentPrice() {
    this.chart.destroy();
    await this.changeChart();
    this.renderPrice();
    this.chart.render();
  }
}
