import { Component, OnInit } from '@angular/core';
import { EurService } from '../eur.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  
  constructor(public eurService: EurService) { }

  ngOnInit(): void {
    this.eurService.getData();
  }
}
