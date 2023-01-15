import { Component, OnInit } from '@angular/core';
import { UrlCoinService } from '../services/url-coin.service';
import { MatDialog } from '@angular/material/dialog';
import { SingleViewComponent } from '../single-view/single-view.component';
import { RenderService } from '../services/render.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss'],
})
export class DetailViewComponent implements OnInit {
  constructor(public renderService: RenderService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getDetail();
  }

  /**
   *
   * @param results give the info about data for the dialog box
   *
   */
  openDialog(results: any): void {
    this.dialog.open(SingleViewComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { results },
    });
  }

  /**
   *
   * get infos for the Detail view
   */
  async getDetail() {
    await this.renderService.getData();
  }
}
