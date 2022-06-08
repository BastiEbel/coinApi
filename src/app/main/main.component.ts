import { Component, HostListener, OnInit } from '@angular/core';
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
  coinPrice: any;
  coinName: any;
  chart: any = [];
  zoom = false;
  date = new Date();

  constructor(public service: UrlCoinService) {
    Chart.register(...registerables);
    Chart.register(zoomPlugin);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.getConfig().then((res) => {
      this.result = res;
      console.log(this.result);
      this.coinPrice = this.result.map((coin: any) => coin.current_price);
      this.coinName = this.result.map((coin: any) => coin.name);
      this.date = this.result[0]['last_updated'];

      this.chart = new Chart('myChart', {
        type: 'line',
        data: {
          labels: this.coinName,
          datasets: [{
            label: 'Coin Diagram',
            data: this.coinPrice,
            borderWidth: 2,
            fill: false,
            borderColor: '#f5f5f5',
          }]
        },
        options: {
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
            zoom: {
              zoom: {
                wheel: {
                  enabled: true
                },
                mode: 'xy'
              }
            }
          }
        }
      });
    });
  }

  resetZoom() {
    this.chart.destroy();
    this.getData();
    
  }

  @HostListener('wheel', ['$event']) onMouseWheel(event: any = WheelEvent) {
    if (event) {
      this.zoom = true;
    }
  }

  @HostListener('mouseout', ['$event']) onLeave(event: MouseEvent) {
    if (this.zoom && event) {
      this.resetZoom();
      this.zoom = false;
    }
  }
}
