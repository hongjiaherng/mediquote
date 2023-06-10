import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultComponent } from './result/result.component';
import { RequestInsuranceComponent } from './request-insurance/request-insurance.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/request-insurance' },
  { path:'request-insurance', component: RequestInsuranceComponent},
  { path:'result', component: ResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
