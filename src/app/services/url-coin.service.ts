import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlCoinService {
  url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&page=1&per_page=49&order=market_cap_desc';
  isLoading = true;
  result: any = [];
  public data$: BehaviorSubject<any> = new BehaviorSubject('');

  constructor(public http: HttpClient) { }

  /**
   *
   * @returns  it returns the REST APi (url)
   */
  getFullList() {
    this.isLoading = true;
    return this.http.get(this.url).toPromise().then((data) => {
      this.isLoading = false;
      return data;
    });
  }

  getPriceDaily(){
    return this.http.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=1&interval=minute`).toPromise().then((dailyData) =>{
      this.isLoading = false;
      return dailyData;
    });
  }

  getDailyCoins(){
    return this.http.get(`https://api.coingecko.com/api/v3/coins/${this.data$}/market_chart?vs_currency=eur&days=1&interval=minute`).toPromise().then((dailyData) =>{
      this.isLoading = false;
      return dailyData;
    });
  }
}

