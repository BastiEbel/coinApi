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
  currentPrice = false;
  pricePercentage = false;
  priceChange = false;
  highestPrice = false;
  lowestPrice = false;

  //TODO for commentation

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
      this.coinPrice = this.result.map((coin: any) => coin.current_price);
      this.coinName = this.result.map((coin: any) => coin.name);
      this.date = this.result[0]['last_updated'];
      this.renderPrice();
    });
  }

  renderPrice() {
    this.currentPrice = true;
    this.pricePercentage = false;
    this.priceChange = false;
    this.highestPrice = false;
    this.lowestPrice = false;
    this.chart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: this.coinName,
        datasets: [{
          label: 'Current price',
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
  }

  renderCurrentPrice() {
    this.chart.destroy();
    this.renderPrice();
    this.chart.render();
  }

  renderPricePercentage() {
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
        labels: this.coinName,
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
  }

  renderPriceChange() {
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
  }

  renderHighestPrice() {
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
  }

  renderLowestPrice() {
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
