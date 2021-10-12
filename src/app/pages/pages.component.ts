import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pages',
  template: `<div *ngIf="loaded" class="main-container">
              <router-outlet></router-outlet>
            </div>`,
})
export class PagesComponent implements OnInit {
  loaded = false;
  userData: any;
  environment: any;
  loadingRouter: boolean;
  terceroName: string = '';
  constructor(private router: Router) {
    this.environment = environment;
    this.loadingRouter = true;
   }

  ngOnInit(): void {
    this.loaded = true;


  }

}
