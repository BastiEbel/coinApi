import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UrlCoinService {
  isLoading = true;
  dailyCoin: string = 'bitcoin';
  currency: string = 'eur';

  constructor(public http: HttpClient) {}

  /**
   *
   * @returns  it returns the REST APi (url)
   */
  getFullList() {
    this.isLoading = true;
    return this.http.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this.currency}&page=1&per_page=49&order=market_cap_desc`
    );
  }

  getTwoWeekCoins() {
    return this.http.get(
      `https://api.coingecko.com/api/v3/coins/${this.dailyCoin}/market_chart?vs_currency=${this.currency}&days=14&interval=daily`
    );
  }

  getThirtyDaysCoins() {
    return this.http.get(
      `https://api.coingecko.com/api/v3/coins/${this.dailyCoin}/market_chart?vs_currency=${this.currency}&days=30&interval=daily`
    );
  }

  getDailyCoins() {
    return this.http.get(
      `https://api.coingecko.com/api/v3/coins/${this.dailyCoin}/market_chart?vs_currency=${this.currency}&days=1&interval=minute`
    );
  }
}
