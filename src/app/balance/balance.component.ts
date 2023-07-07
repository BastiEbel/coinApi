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
  doughnutChart: any;
  public selectedItem;

  constructor(
    public renderService: RenderService,
    public percentageSort: PercentageSortService,
    private changeDetector: ChangeDetectorRef
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.showData();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
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
      this.percentageSort.shortValue();

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
