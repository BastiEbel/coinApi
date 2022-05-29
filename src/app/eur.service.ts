import { Injectable } from '@angular/core';
import { UrlCoinService } from './url-coin.service';

@Injectable({
  providedIn: 'root'
})
export class EurService {

  constructor(public coinService: UrlCoinService) { }
  coinData:any = [];
  coins:any =[];
  time:any = [];

  async getData(){
    await this.coinService.getConfig().subscribe(data =>{
      this.coinData = data;
      console.log(this.coinData);
      
      console.log(this.coinData.bpi['EUR']);
      this.coins = this.coinData.bpi['EUR'];
      this.time = this.coinData.time['updated'];
    });
  }
}
