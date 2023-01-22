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
  shorCurrenttPrice: number;
  shortHighPrice: number;
  shortLowPrice: number;
  doughnutChart: any;
  public selectedItem;

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

  /**
   * get 2 digits after the comma
   *
   */
  async shortPercentage() {
    try {
      let decimal = await this.renderService.currentCoin[
        'price_change_percentage_24h'
      ];
      this.percentage = decimal.toFixed(2);
      this.shortPrices();
    } catch (err) {
      console.error(err);
    }
  }

  async shortPrices() {
    try {
      let current = await this.renderService.currentCoin['current_price'];
      let low = await this.renderService.currentCoin['low_24h'];
      let high = await this.renderService.currentCoin['high_24h'];
      this.shorCurrenttPrice = current.toFixed(2);
      this.shortLowPrice = low.toFixed(2);
      this.shortHighPrice = high.toFixed(2);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * get Data for the pie chart
   *
   */
  async showData() {
    try {
      if (this.doughnutChart) {
        this.doughnutChart.destroy();
      }
      await this.percentageSort.getSortData();
      this.shortPercentage();

      this.clear();
      this.renderDoughnut();
    } catch (err) {
      console.error(err);
    }
  }
  /**
   * clear select box
   *
   */
  clear() {
    this.selectedItem = 'highesPercentage';
  }

  /**
   * function for the select box
   * @param $event
   *
   */
  onChange($event) {
    try {
      let isSelected =
        $event.target.options[$event.target.options.selectedIndex].value;
      if (isSelected === 'highesPercentage') {
        this.percentageSort.getHighestPercentageValue();
        this.doughnutChart.destroy();
        this.renderDoughnut();
      } else if (isSelected === 'highestCoin') {
        this.percentageSort.getHighestCoinValue();
        this.doughnutChart.destroy();
        this.renderDoughnut();
      } else {
        this.percentageSort.getLowestCoinValue();
        this.doughnutChart.destroy();
        this.renderDoughnut();
      }
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * render pie chart
   *
   */
  renderDoughnut() {
    this.doughnutChart = new Chart('doughnutCanvas', {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: this.percentageSort.currentData,
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
