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
import { CalcComponent } from '../calc/calc.component';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss'],
})
export class ScrollComponent implements OnInit, AfterViewInit {
  @Output('selectedCoins') selectedCoins: EventEmitter<any> =
    new EventEmitter();
  @ViewChild('nav', { read: DragScrollComponent }) ds: DragScrollComponent;

  arrowLeft: boolean = false;
  arrowRight: boolean = false;

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
      this.arrowLeft = true;
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
        this.arrowLeft = false;
      } else {
        this.arrowLeft = true;
      }
      if (this.ds.currIndex != 47) {
        this.arrowRight = false;
      } else {
        this.arrowRight = true;
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
        this.arrowLeft = false;
      } else {
        this.arrowLeft = true;
      }
      if (this.ds.currIndex < 48) {
        this.arrowRight = false;
      } else {
        this.arrowRight = true;
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
    this.renderService.currentCoin = [];
    for (let i = 0; i < this.renderService.result.length; i++) {
      if (id == this.renderService.result[i]['id']) {
        this.service.dailyCoin = id;
        this.renderService.coinName = this.renderService.result[i]['name'];
        this.renderService.currentCoin = this.renderService.result[i];
      }
    }
    this.selectedCoins.emit();
  }
}
