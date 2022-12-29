import { Injectable } from '@angular/core';
import { UrlCoinService } from './url-coin.service';
import { BehaviorSubject, firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RenderService {
  isactive: boolean = false;
  coinOfDay: boolean = false;
  coinOfWeek: boolean = false;
  arrowLeft: boolean = false;
  arrowRight: boolean = false;
  result: any = [];
  coinPrice: any = [];
  coindate: any = [];
  date = new Date();

  constructor(private service: UrlCoinService) {}
  /**
   * this function gets the data for the coins
   *
   */
  async getData() {
    await this.service.getFullList().subscribe((res) => {
      this.result = res;
      this.service.isLoading = false;
    });
  }

  async dailyCoinPrice() {
    try {
      let priceData = await firstValueFrom(this.service.getDailyCoins());
      this.dailyTime(priceData);
      priceData['prices'].map((price) => {
        this.coinPrice.push(price[1]);
      });
    } catch (err) {
      console.error(err);
    }
  }

  dailyTime(priceData) {
    let getTimeData = [];
    priceData['prices'].map((getTime) => {
      getTimeData.push(getTime);
    });
    if (this.coinOfDay) {
      this.getDailyTime(getTimeData);
    } else if (this.coinOfWeek) {
      this.getWeeklyTime(getTimeData);
    }
  }

  getDailyTime(getTimeData) {
    let currentDate: any = [];
    let timestamp;
    for (let i = 0; i < getTimeData.length; i++) {
      timestamp = getTimeData[i]['0'];
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

  async weeklyCoinPrice() {
    try {
      let weeklyPriceData = await firstValueFrom(
        this.service.getTwoWeekCoins()
      );
      this.dailyTime(weeklyPriceData);
      weeklyPriceData['prices'].map((weeklyPrice) => {
        this.coinPrice.push(weeklyPrice[1]);
      });
    } catch (err) {
      console.error(err);
    }
  }
  getWeeklyTime(getTimeData) {
    let currentDate: any = [];
    let timestamp;
    for (let i = 0; i < getTimeData.length; i++) {
      timestamp = getTimeData[i]['0'];
      let timeFormat: any = {
        formatMatcher: 'basic',
        day: 'numeric',
        month: 'numeric',
      };
      currentDate = new Date(timestamp).toLocaleDateString('de', timeFormat);
      this.coindate.push(currentDate);
    }
  }
}
