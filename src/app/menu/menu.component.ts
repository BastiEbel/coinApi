import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BalanceComponent } from '../balance/balance.component';
import { ChartComponent } from '../chart/chart.component';
import { MainComponent } from '../main/main.component';
import { CalcService } from '../services/calc.service';
import { PercentageSortService } from '../services/percentage-sort.service';
import { RenderService } from '../services/render.service';
import { UrlCoinService } from '../services/url-coin.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(
    public renderService: RenderService,
    private calcService: CalcService,
    private service: UrlCoinService,
    private mainComp: MainComponent
  ) {}
  ngOnInit(): void {}

  onChange(disabled: boolean) {
    if (disabled) {
      this.service.currency = 'usd';
      this.renderService.currencyName = 'USD';
      this.updateInfos();
    } else {
      this.service.currency = 'eur';
      this.renderService.currencyName = 'EUR';
      this.updateInfos();
    }
  }

  updateInfos() {
    this.renderService.getData();
    this.renderService.dailyCoinPrice();
    this.calcService.calcNewOne();
    this.mainComp.drawNewChart();
  }
}
