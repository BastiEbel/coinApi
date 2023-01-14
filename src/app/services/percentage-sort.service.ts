import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UrlCoinService } from './url-coin.service';

@Injectable({
  providedIn: 'root',
})
export class PercentageSortService {
  item: any = [];
  constructor(private service: UrlCoinService) {}

  async getSortData() {
    let percentageHighest = await firstValueFrom(this.service.getFullList());
    this.getHighestValue(percentageHighest);
    this.service.isLoading = false;
  }
  getHighestValue(percentageHighest) {
    let element = percentageHighest;
    Object.assign(this.item, element);
    this.item = percentageHighest.sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    );
    return this.item;
  }
}
