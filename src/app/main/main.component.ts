import { Component, OnInit } from '@angular/core';
import { EurService } from '../eur.service';
import { GbpService } from '../gbp.service';
import { UsdService } from '../usd.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  
  constructor(public eurService: EurService, public gbService: GbpService,
              public usService: UsdService) { }

  ngOnInit(): void {
    this.eurService.getData();
    this.gbService.getGBData();
    this.usService.getUSData();
  }
}
