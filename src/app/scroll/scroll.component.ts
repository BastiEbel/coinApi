import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { UrlCoinService } from '../services/url-coin.service';
import { RenderService } from '../services/render.service';
import { DragScrollComponent } from 'ngx-drag-scroll';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss'],
})
export class ScrollComponent implements OnInit, AfterViewInit {
  @Output('selectedCoins') selectedCoins: EventEmitter<any> =
    new EventEmitter();
  @ViewChild('nav', { read: DragScrollComponent }) ds: DragScrollComponent;

  constructor(
    public service: UrlCoinService,
    public renderService: RenderService,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.renderService.getData();
    this.cdref.detectChanges();
    setTimeout(() => {
      this.ds.moveTo(0);
      this.renderService.arrowLeft = true;
    }, 0);
  }
  /**
   * function to scroll left about click
   *
   */
  moveLeft() {
    this.ds.moveLeft();
    setTimeout(() => {
      if (this.ds.currIndex != 0) {
        this.renderService.arrowLeft = false;
      } else {
        this.renderService.arrowLeft = true;
      }
      if (this.ds.currIndex != 47) {
        this.renderService.arrowRight = false;
      } else {
        this.renderService.arrowRight = true;
      }
    }, 0.25);
  }
  /**
   * function to scroll right about click
   *
   */
  moveRight() {
    this.ds.moveRight();
    setTimeout(() => {
      if (this.ds.currIndex != 0) {
        this.renderService.arrowLeft = false;
      } else {
        this.renderService.arrowLeft = true;
      }
      if (this.ds.currIndex < 48) {
        this.renderService.arrowRight = false;
      } else {
        this.renderService.arrowRight = true;
      }
    }, 0.5);
  }

  /**
   * function scrolls to the correct position at first load
   *
   */
  moveTo(index) {
    this.ds.moveTo(index);
  }

  /* *
   *
   * @param id give the id to the service and put it in the url
   *
   */
  async selectedCoin(id) {
    for (let i = 0; i < this.renderService.result.length; i++) {
      if (id == this.renderService.result[i]['id']) {
        this.service.dailyCoin = id;
        this.renderService.coinName = this.renderService.result[i]['name'];
      }
    }
    this.selectedCoins.emit();
    /* if (this.renderService.coinOfDay) {
      this.chartComponent.dailyChart();
    } else if (this.renderService.coinOfWeek) {
      this.chartComponent.weeklyChart();
    } else if (this.renderService.coinOfMonth) {
      this.chartComponent.monthChart();
    } */
  }
}
