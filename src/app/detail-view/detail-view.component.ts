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

  constructor(public service: UrlCoinService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getDetail();
  }

  openDialog() {
    this.dialog.open(SingleViewComponent);
  }

  getDetail(){
    this.service.getConfig().then((res) => {
      this.result = res;
      console.log(this.result);
    });
  }
}
