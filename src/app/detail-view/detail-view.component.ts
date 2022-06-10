import { Component, OnInit } from '@angular/core';
import { UrlCoinService } from '../services/url-coin.service';
import {MatDialog} from '@angular/material/dialog';
import { SingleViewComponent } from '../single-view/single-view.component';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {

  result:any = [];
  p = 1;
  pages = Array(Math.ceil(100 / 2)).fill(null).map((_, i) => ({label: i, value: i}));

  constructor(public service: UrlCoinService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getDetail();
  }

  onPageEvent(event: any) {
    this.p = event;
  }

  openDialog(results: any) :void {
    this.dialog.open(SingleViewComponent, {
      data: { results }
    });
  }

  getDetail(){
    this.service.getConfig().then((res) => {
      this.result = res;
    });
  }
}
