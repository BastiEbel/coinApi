import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UrlCoinService } from '../services/url-coin.service';


@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.scss']
})
export class SingleViewComponent implements OnInit {

  constructor(public service: UrlCoinService, public dialogRef: MatDialogRef<SingleViewComponent>, @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
