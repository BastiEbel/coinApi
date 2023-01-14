import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { PercentageSortService } from '../services/percentage-sort.service';
import { RenderService } from '../services/render.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {
  percentage: number;
  doughnutChart: any;

  constructor(
    public renderService: RenderService,
    public percentageSort: PercentageSortService,
    private changeDetector: ChangeDetectorRef
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.showData();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
  shortPercentage() {
    let decimal = this.renderService.currentCoin['price_change_percentage_24h'];
    this.percentage = decimal.toFixed(2);
  }
  async showData() {
    await this.percentageSort.getSortData();
    this.shortPercentage();
    this.renderDoughnut();
  }

  renderDoughnut() {
    this.doughnutChart = new Chart('doughnutCanvas', {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [
              this.percentageSort.item[0].price_change_percentage_24h,
              this.percentageSort.item[1].price_change_percentage_24h,
              this.percentageSort.item[2].price_change_percentage_24h,
            ],
            backgroundColor: [
              'rgb(0, 136, 255)',
              'rgb(255, 51, 255)',
              'rgb(51, 255, 51)',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            enabled: false,
          },
        },
      },
    });
  }
}
