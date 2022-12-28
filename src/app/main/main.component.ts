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
    this.updateChart();
    this.cdref.detectChanges();
    setTimeout(() => {
      this.ds.moveTo(0);
      this.renderService.arrowLeft = true;
    }, 0);
  }
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

  moveRight() {
    this.ds.moveRight();
    setTimeout(() => {
      if (this.ds.currIndex != 0) {
        this.renderService.arrowLeft = false;
      } else {
        this.renderService.arrowLeft = true;
      }
      if (this.ds.currIndex < 49) {
        this.renderService.arrowRight = false;
      } else {
        this.renderService.arrowRight = true;
      }
    }, 0.25);
  }

  moveTo(index) {
    this.ds.moveTo(index);
  }

  async updateChart() {
    try {
      this.renderService.coinPrice = [];
      this.renderService.coindate = [];
      await this.renderService.dailyCoinPrice();
      this.drawChart();
    } catch (err) {
      console.error(err);
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
    this.myChart.destroy();
    this.updateChart();
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
   * this function renders the current price in the  big chart
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
            display: true,
            labels: {
              color: '#f5f5f5',
            },
          },
        },
      },
    });
  }
}
