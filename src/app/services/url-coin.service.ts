import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrlCoinService {
  url =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&page=1&per_page=49&order=market_cap_desc';
  isLoading = true;
  dailyCoin: string = 'bitcoin';

  constructor(public http: HttpClient) {}

  /**
   *
   * @returns  it returns the REST APi (url)
   */
  getFullList() {
    this.isLoading = true;
    return this.http.get(this.url);
  }

  getPriceDaily() {
    return this.http.get(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=1&interval=minute`
    );
  }

  getDailyCoins() {
    return this.http.get(
      `https://api.coingecko.com/api/v3/coins/${this.dailyCoin}/market_chart?vs_currency=eur&days=1&interval=minute`
    );
  }
}
