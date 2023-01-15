import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UrlCoinService } from './url-coin.service';

@Injectable({
  providedIn: 'root',
})
export class PercentageSortService {
  percentageValue: boolean = true;
  highestCoin: boolean = false;
  lowestCoin: boolean = false;
  item: any = [];
  data: any = [];
  currentData: any = [];
  constructor(private service: UrlCoinService) {}

  async getSortData() {
    this.data = [];
    this.data = await firstValueFrom(this.service.getFullList());
    this.getHighestPercentageValue();
    this.service.isLoading = false;
  }

  getHighestPercentageValue() {
    this.highestCoin = false;
    this.lowestCoin = false;
    this.percentageValue = true;
    this.item = [];
    let element = this.data;
    Object.assign(this.item, element);
    this.item = this.data.sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
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
    this.item = this.data.sort((a, b) => b.current_price - a.current_price);
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
