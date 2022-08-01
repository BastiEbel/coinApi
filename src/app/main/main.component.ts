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
  coinName: any;
  coinPrice: any = [];
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
    this.coinName = this.result.map((coin) => coin.name);
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
        currentDate.push(new Date(timestamp).toLocaleTimeString('de', timeFormat));
        this.coindate.push(currentDate[1]);
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
    /* this.currentPrice = true;
    this.pricePercentage = false;
    this.priceChange = false;
    this.highestPrice = false;
    this.lowestPrice = false; */
    this.chart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: this.coindate,
        datasets: [{
          label: this.coinName[0],
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
          },
          /* zoom: {
            zoom: {
              wheel: {
                enabled: true
              },
              mode: 'xy'
            }
          } */
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

  /**
   * this function renders the price in percent in the chart
   *
   */
  /* renderPricePercentage() {
    this.currentPrice = false;
    this.pricePercentage = true;
    this.priceChange = false;
    this.highestPrice = false;
    this.lowestPrice = false;
    this.chart.destroy();
    let coinPercentage = this.result.map((coin: any) => coin.price_change_percentage_24h)
    this.chart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: this.service.coinName,
        datasets: [{
          label: 'Price change last 24h in %',
          data: coinPercentage,
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
          legend: {
            labels: {
              color: "#f5f5f5"
            }
          },
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
    this.chart.render();
  } */

  /**
   * this function renders the price changes from the last 24h in the chart
   *
   */
  /* renderPriceChange() {
    this.currentPrice = false;
    this.pricePercentage = false;
    this.priceChange = true;
    this.highestPrice = false;
    this.lowestPrice = false;
    this.chart.destroy();
    let coinPriceChange = this.result.map((coin: any) => coin.price_change_24h)
    this.chart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: this.coinName,
        datasets: [{
          label: 'Price change last 24h in €',
          data: coinPriceChange,
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
          legend: {
            labels: {
              color: "#f5f5f5"
            }
          },
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
    this.chart.render();
  } */

  /**
   * this function renders the highest price from the last 24h in the chart
   *
   */
  /* renderHighestPrice() {
    this.currentPrice = false;
    this.pricePercentage = false;
    this.priceChange = false;
    this.highestPrice = true;
    this.lowestPrice = false;
    this.chart.destroy();
    let coinHighestPrice = this.result.map((coin: any) => coin.high_24h)
    this.chart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: this.coinName,
        datasets: [{
          label: 'Highest price last 24h in €',
          data: coinHighestPrice,
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
          legend: {
            labels: {
              color: "#f5f5f5"
            }
          },
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
    this.chart.render();
  } */

  /**
   * this function renders the lowest from the last 24h in the chart
   *
   */
  /* renderLowestPrice() {
    this.currentPrice = false;
    this.pricePercentage = false;
    this.priceChange = false;
    this.highestPrice = false;
    this.lowestPrice = true;
    this.chart.destroy();
    let coinLowestPrice = this.result.map((coin: any) => coin.low_24h)
    this.chart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: this.coinName,
        datasets: [{
          label: 'Lowest price last 24h in €',
          data: coinLowestPrice,
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
          legend: {
            labels: {
              color: "#f5f5f5"
            }
          },
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
    this.chart.render();
  } */

  /**
   * this function reset the zoom if you zoom in the chart
   *
   */
  /* resetZoom() {
    this.chart.destroy();
    this.getData();

  } */

  /* @HostListener('wheel', ['$event']) onMouseWheel(event: any = WheelEvent) {
    if (event) {
      this.zoom = true;
    }
  }

  @HostListener('mouseout', ['$event']) onLeave(event: MouseEvent) {
    if (this.zoom && event) {
      this.resetZoom();
      this.zoom = false;
    }
  } */
}
