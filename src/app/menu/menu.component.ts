import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RenderService } from '../services/render.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  filterCoin: Array<any> = [];
  constructor(public renderService: RenderService) {}
  ngOnInit(): void {}
}
