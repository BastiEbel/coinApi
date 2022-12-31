import { Component, OnInit } from '@angular/core';
import { RenderService } from '../services/render.service';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss'],
})
export class CalcComponent implements OnInit {
  imgSrc = '/assets/icons/circle.png';

  constructor(public renderService: RenderService) {}

  ngOnInit(): void {}
  ngAfterViewInit() {}
}
