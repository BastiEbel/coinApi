import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Component
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { MenuComponent } from './menu/menu.component';
import { ImprintComponent } from './imprint/imprint.component';
import { FooterComponent } from './footer/footer.component';
import { BalanceComponent } from './balance/balance.component';
import { SingleViewComponent } from './single-view/single-view.component';
import { LoadingComponent } from './services/loading';
import { CalcComponent } from './calc/calc.component';
import { ScrollComponent } from './scroll/scroll.component';
import { ChartComponent } from './chart/chart.component';

//Module
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DragScrollModule } from 'ngx-drag-scroll';
import { FormsModule } from '@angular/forms';

//Pipe for search function
import { SearchPipePipe } from './services/search-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DetailViewComponent,
    MenuComponent,
    ImprintComponent,
    FooterComponent,
    SingleViewComponent,
    LoadingComponent,
    CalcComponent,
    ScrollComponent,
    ChartComponent,
    BalanceComponent,
    SearchPipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSlideToggleModule,
    DragScrollModule,
    MatProgressSpinnerModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
