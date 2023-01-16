import { Injectable } from '@angular/core';
import { UrlCoinService } from './url-coin.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RenderService {
  isactive: boolean = false;
  coinOfDay: boolean = false;
  coinOfWeek: boolean = false;
  coinOfMonth: boolean = false;
  isDisabled: boolean;
  coinName: string = 'Bitcoin';
  search: string;
  currentCoin: any = [];
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
    let res = await firstValueFrom(this.service.getFullList());
    this.result = res;
    this.currentCoin = this.result[0];
    this.service.isLoading = false;
  }

  /**
   * function for the daily chart query
   *
   */
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

  /**
   * function map to json for the timestamp
   *
   */
  dailyTime(priceData) {
    let getTimeData = [];
    priceData['prices'].map((getTime) => {
      getTimeData.push(getTime);
    });
    if (this.coinOfDay) {
      this.getDailyTime(getTimeData);
    } else {
      this.getWeeklyTime(getTimeData);
    }
  }

  /**
   * function map to json for the timestamp
   *
   */
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

  /**
   * function for the two weeks chart query
   *
   */
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
  /**
   * function map to json for the timestamp
   *
   */
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

  /**
   * function for the tirty days chart query
   *
   */
  async monthCoinPrice() {
    try {
      let monthPriceData = await firstValueFrom(
        this.service.getThirtyDaysCoins()
      );
      this.dailyTime(monthPriceData);
      monthPriceData['prices'].map((monthPrice) => {
        this.coinPrice.push(monthPrice[1]);
      });
    } catch (err) {
      console.error(err);
    }
  }
}
