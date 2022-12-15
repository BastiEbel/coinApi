import { Injectable } from '@angular/core';
import { UrlCoinService } from './url-coin.service';

@Injectable({
  providedIn: 'root',
})
export class RenderService {
  result: any = [];
  ctxResult: any = [];
  coindate: any = [];
  date = new Date();
  coinPrice: object = {};
  constructor(private service: UrlCoinService) {}
  /**
   * this function gets the data from the service
   *
   */
  async getData() {
    await this.service.getFullList().then((res) => {
      this.result = res;
    });
  }

  /**
   *
   * this function update the Chart with the new query
   */
  async changeChart() {
    await this.service.getDailyCoins().then((newPrice) => {
      this.ctxResult = newPrice['prices'].map((coin: any) => coin);
      this.coinPrice = this.ctxResult.map(
        (currentCoin: any) => currentCoin['1']
      );
    });
  }

  getDailyTime() {
    let currentDate: any = [];
    let timestamp;
    for (let i = 0; i < this.ctxResult.length; i++) {
      timestamp = this.ctxResult[i]['0'];
      let timeFormat: any = {
        formatMatcher: 'basic',
        hour: 'numeric',
        minute: 'numeric',
        hourCycle: 'h24',
      };
      currentDate = new Date(timestamp).toLocaleTimeString('de', timeFormat);
      this.coindate.push(currentDate);
    }
  }
}
