import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepuracionSaldosComponent } from './depuracion-saldos/depuracion-saldos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'depuracion_saldos',
      component: DepuracionSaldosComponent,
    },
    {
      path: '', redirectTo: 'dashboard', pathMatch: 'full',
    },
  ]
    
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
