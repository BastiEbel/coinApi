import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataProtectionComponent } from './data-protection/data-protection.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { ImprintComponent } from './imprint/imprint.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path: '',component: MainComponent},
  {path: 'detail', component: DetailViewComponent},
  {path: 'imprint', component: ImprintComponent},
  {path: 'data-protection', component: DataProtectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
