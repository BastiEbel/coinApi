import { Component, OnInit } from '@angular/core';
import { RenderService } from '../services/render.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {
  constructor(public renderService: RenderService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {}
}
