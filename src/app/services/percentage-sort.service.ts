import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { RenderService } from './render.service';
import { UrlCoinService } from './url-coin.service';

@Injectable({
  providedIn: 'root',
})
export class PercentageSortService {
  percentageValue: boolean = true;
  highestCoin: boolean = false;
  lowestCoin: boolean = false;
  percentage: number;
  shorCurrenttPrice: number;
  shortHighPrice: number;
  shortLowPrice: number;
  item: any = [];
  data: any = [];
  currentData: any = [];
  constructor(
    private renderService: RenderService,
    private service: UrlCoinService
  ) { }

  async getSortData() {
    this.data = [];
    this.data = await firstValueFrom(this.service.getFullList());
    this.getHighestPercentageValue();
    this.service.isLoading = false;
  }

  /**
   * get 2 digits after the comma
   *
   */
  async shortValue() {
    try {
      let decimal = await this.renderService.currentCoin[
        'price_change_percentage_24h'
      ];
      setTimeout(() => {
        let current = this.renderService.currentCoin['current_price'];
        let low = this.renderService.currentCoin['low_24h'];
        let high = this.renderService.currentCoin['high_24h'];
        this.percentage = decimal.toFixed(2);
        this.shorCurrenttPrice = current.toFixed(2);
        this.shortLowPrice = low.toFixed(2);
        this.shortHighPrice = high.toFixed(2);
      }, 750);
    } catch (err) {
      console.error(err);
    }
  }

  getHighestPercentageValue() {
    this.highestCoin = false;
    this.lowestCoin = false;
    this.percentageValue = true;
    this.item = [];
    let element = this.data;
    Object.assign(this.item, element);
    this.item = this.data.sort(
      (a: any, b: any) => b.price_change_percentage_24h - a.price_change_percentage_24h
    );
    this.getChartData();
    return this.item, this.percentageValue;
  }

  getHighestCoinValue() {
    this.percentageValue = false;
    this.lowestCoin = false;
    this.highestCoin = true;
    this.item = [];
    let element = this.data;
    Object.assign(this.item, element);
    this.item = this.data.sort((a: any, b: any) => b.current_price - a.current_price);
    this.getChartData();
    return this.item, this.highestCoin;
  }

  getLowestCoinValue() {
    this.percentageValue = false;
    this.highestCoin = false;
    this.lowestCoin = true;
    this.item = [];
    let element = this.data;
    Object.assign(this.item, element);
    this.item = this.data.sort((a, b) => a.low_24h - b.low_24h);
    this.getChartData();
    return this.item, this.lowestCoin;
  }

  getChartData() {
    this.currentData = [];
    let shortItems = this.item.slice(0, 3);
    if (this.percentageValue) {
      this.currentData = [
        shortItems[0]['price_change_percentage_24h'],
        shortItems[1]['price_change_percentage_24h'],
        shortItems[2]['price_change_percentage_24h'],
      ];
      return this.currentData;
    } else if (this.highestCoin) {
      this.currentData = [
        shortItems[0]['current_price'],
        shortItems[1]['current_price'],
        shortItems[2]['current_price'],
      ];
      return this.currentData;
    } else {
      this.currentData = [
        shortItems[0]['low_24h'],
        shortItems[1]['low_24h'],
        shortItems[2]['low_24h'],
      ];
      return this.currentData;
    }
  }
}
