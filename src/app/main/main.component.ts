import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { UrlCoinService } from '../services/url-coin.service';
import zoomPlugin from 'chartjs-plugin-zoom';
import { RenderService } from '../services/render.service';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { ViewportScroller } from '@angular/common';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  coinName: any = 'Bitcoin';
  chart: any;
  isactive: boolean = false;
  arrowLeft: boolean = false;
  arrowRight: boolean = false;
  @ViewChild('myChart') canvas: ElementRef;
  @ViewChild('nav', { read: DragScrollComponent }) ds: DragScrollComponent;

  moveLeft() {
    this.ds.moveLeft();
    setTimeout(() => {
      if (this.ds.currIndex != 0) {
        this.arrowLeft = false;
      } else {
        this.arrowLeft = true;
      }
      if (this.ds.currIndex != 47) {
        this.arrowRight = false;
      } else {
        this.arrowRight = true;
      }
    }, 0.25);
  }

  moveRight() {
    this.ds.moveRight();
    setTimeout(() => {
      console.log(this.ds.currIndex);

      if (this.ds.currIndex != 0) {
        this.arrowLeft = false;
      } else {
        this.arrowLeft = true;
      }
      if (this.ds.currIndex < 49) {
        this.arrowRight = false;
      } else {
        this.arrowRight = true;
      }
    }, 0.25);
  }

  moveTo(index) {
    this.ds.moveTo(index);
  }

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
  ngOnChanges() {}
  ngAfterViewInit() {
    setTimeout(() => {
      this.ds.moveTo(0);
      this.arrowLeft = true;
    }, 0);
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
