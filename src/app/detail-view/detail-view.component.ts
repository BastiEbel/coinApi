import { Component, OnInit } from '@angular/core';
import { UrlCoinService } from '../services/url-coin.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {

  result:any = [];

  constructor(public service: UrlCoinService) { }

  ngOnInit(): void {
    this.getDetail();
  }

  getDetail(){
    this.service.getConfig().then((res) => {
      this.result = res;
      console.log(this.result);
    });
  }
}
