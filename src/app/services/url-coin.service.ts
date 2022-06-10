import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UrlCoinService {
  url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&page=1&per_page=49&order=market_cap_desc';
  isLoading = true;
  constructor(public http: HttpClient) { }

  getConfig() {
    this.isLoading = true;
    return this.http.get(this.url).toPromise().then((data) => {
      this.isLoading = false;
      return data;
    });
  }
}

