import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UrlCoinService {
  isLoading = true;
  dailyCoin: string = 'bitcoin';

  constructor(public http: HttpClient) {}

  /**
   *
   * @returns  it returns the REST APi (url)
   */
  getFullList() {
    this.isLoading = true;
    return this.http.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&page=1&per_page=49&order=market_cap_desc'
    );
  }

  getTwoWeekCoins() {
    return this.http.get(
      `https://api.coingecko.com/api/v3/coins/${this.dailyCoin}/market_chart?vs_currency=eur&days=14&interval=daily`
    );
  }

  getThirtyDaysCoins() {
    return this.http.get(
      `https://api.coingecko.com/api/v3/coins/${this.dailyCoin}/market_chart?vs_currency=eur&days=30&interval=daily`
    );
  }

  getDailyCoins() {
    return this.http.get(
      `https://api.coingecko.com/api/v3/coins/${this.dailyCoin}/market_chart?vs_currency=eur&days=1&interval=minute`
    );
  }
}
