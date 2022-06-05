import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { UrlCoinService } from '../services/url-coin.service';
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

  constructor(public service: UrlCoinService, private http: HttpClient) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.service.getConfig().then((res) => {
      this.result = res;
      console.log(this.result);
      this.coinPrice = this.result.map((coin: any) => coin.current_price);
      this.coinName = this.result.map((coin: any) => coin.name);

      this.chart = new Chart('myChart', {
        type: 'line',
        data: {
          labels: this.coinName,
          datasets: [{
            label: 'Coin Price',
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
          }
        }
      });
    });
  }
}
