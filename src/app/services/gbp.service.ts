import { Injectable } from '@angular/core';
import { UrlCoinService } from './url-coin.service';


@Injectable({
  providedIn: 'root'
})
export class GbpService {

  constructor(public gbService: UrlCoinService) { }
  coinData:any = [];
  coins:any =[];
  time:any = [];

  async getGBData(){
    await this.gbService.getConfig().subscribe(data =>{
      this.coinData = data;
      
      this.coins = this.coinData.bpi['GBP'];
      this.time = this.coinData.time['updated'];
    });
  }
}
