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
  coinPrice: any = [];
  coinName: any;
  coindate: any = [];
  updateDate = new Date();
  chart: any = {};
  zoom = false;
  date = new Date();
  currentPrice = false;
  pricePercentage = false;
  priceChange = false;
  highestPrice = false;
  lowestPrice = false;

  @ViewChild('myChart') canvas: ElementRef;

  constructor(public service: UrlCoinService) {
    Chart.register(...registerables);
    Chart.register(zoomPlugin);
  }

  ngOnInit(): void {
    this.getData();
    //this.getTimeData();
  }

  /**
   * this function gets the data from the service
   *
   */
  async getData() {
    await this.service.getFullList().then((res) => {
      this.result = res;
      this.coinName = this.result.map((coin) => coin.name)
      console.log('result', res);
    });
    this.getTimeData();
  }

  async getTimeData(){
    await this.service.getPriceDaily().then((price) => {
      console.log(price);
      let currentDate: any = [];
      let timestamp;
      this.ctxResult = price['prices'].map((coin: any) => coin);
      this.coinPrice = this.ctxResult.map((currentCoin:any) => currentCoin['1']);
      for (let i = 0; i < this.ctxResult.length; i++) {
        timestamp = this.ctxResult[i]['0'];
        let timeFormat: any = { formatMatcher: 'basic', hour: 'numeric', minute: 'numeric', hourCycle: 'h24' };
        currentDate = new Date(timestamp).toLocaleTimeString('de', timeFormat);
        this.coindate.push(currentDate);
      }
      this.renderPrice();
    });
  }

  canvasColor(){
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
   * this function renders the current price in the chart
   *
   */
  renderPrice() {
    this.chart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: this.coindate,
        datasets: [{
          label: this.coinName,
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
    this.chart.render();
  }

  /**
   * this function updates the chart
   *
   */
  renderCurrentPrice() {
    this.chart.destroy();
    this.renderPrice();
    this.chart.render();
  }
}
