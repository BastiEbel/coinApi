import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UrlCoinService {
  url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
  constructor(public http: HttpClient) { }

  getConfig() {
    return this.http.get(this.url);
  }
}

