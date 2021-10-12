import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepuracionSaldosComponent } from './depuracion-saldos/depuracion-saldos.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    DepuracionSaldosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
