import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RenderService } from '../services/render.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {
  public percentage: number;
  constructor(
    public renderService: RenderService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.getData();
    }, 250);
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  async getData() {
    let decimal = await this.renderService.currentCoin[
      'price_change_percentage_24h'
    ];
    this.percentage = decimal.toFixed(2);
  }
}
