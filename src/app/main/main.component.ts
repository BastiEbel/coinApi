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
import { DragScrollComponent } from 'ngx-drag-scroll';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit {
  coinName: any = 'Bitcoin';
  myChart: any;

  @ViewChild('myChart') canvas: ElementRef;
  @ViewChild('nav', { read: DragScrollComponent }) ds: DragScrollComponent;

  constructor(
    public service: UrlCoinService,
    public renderService: RenderService,
    private cdref: ChangeDetectorRef
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.renderService.getData();
    this.dailyChart();
    this.cdref.detectChanges();
    setTimeout(() => {
      this.ds.moveTo(0);
      this.renderService.arrowLeft = true;
    }, 0);
  }
  /**
   * function to scroll left about click
   *
   */
  moveLeft() {
    this.ds.moveLeft();
    setTimeout(() => {
      if (this.ds.currIndex != 0) {
        this.renderService.arrowLeft = false;
      } else {
        this.renderService.arrowLeft = true;
      }
      if (this.ds.currIndex != 47) {
        this.renderService.arrowRight = false;
      } else {
        this.renderService.arrowRight = true;
      }
    }, 0.25);
  }
  /**
   * function to scroll right about click
   *
   */
  moveRight() {
    this.ds.moveRight();
    setTimeout(() => {
      if (this.ds.currIndex != 0) {
        this.renderService.arrowLeft = false;
      } else {
        this.renderService.arrowLeft = true;
      }
      if (this.ds.currIndex < 48) {
        this.renderService.arrowRight = false;
      } else {
        this.renderService.arrowRight = true;
      }
    }, 0.5);
  }

  /**
   * function scrolls to the correct position at first load
   *
   */
  moveTo(index) {
    this.ds.moveTo(index);
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
      this.drawChart();
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
   * @param id give the id to the service and put it in the url
   *
   */
  async selectedCoin(id) {
    for (let i = 0; i < this.renderService.result.length; i++) {
      if (id == this.renderService.result[i]['id']) {
        this.service.dailyCoin = id;
        this.coinName = this.renderService.result[i]['name'];
      }
    }
    if (this.renderService.coinOfDay) {
      this.dailyChart();
    } else if (this.renderService.coinOfWeek) {
      this.weeklyChart();
    } else if (this.renderService.coinOfMonth) {
      this.monthChart();
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
    gradientFill.addColorStop(0.2, 'transparent');
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
        maintainAspectRatio: false,
        scales: {
          y: {
            ticks: {
              color: '#f5f5f5',
            },
          },
          x: {
            //beginAtZero: false,
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
