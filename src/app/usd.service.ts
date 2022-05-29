import { Injectable } from '@angular/core';
import { UrlCoinService } from './url-coin.service';

@Injectable({
  providedIn: 'root'
})
export class UsdService {

  constructor(public usService: UrlCoinService) { }
  coinData:any = [];
  coins:any =[];
  time:any = [];

  async getUSData(){
    await this.usService.getConfig().subscribe(data =>{
      this.coinData = data;
      
      this.coins = this.coinData.bpi['USD'];
      this.time = this.coinData.time['updated'];
    });
  }
}
