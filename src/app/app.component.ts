import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router, NavigationEnd } from '@angular/router';
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loadRouting = false;
  environment = environment;
  loadingRouter: boolean = false;
  title = 'arka-financiera-cliente';
  constructor(
    private router: Router
  ) {
      this.router.events.subscribe(event => {
         if(event instanceof NavigationEnd){
           gtag('config', 'G-RBY2GQV40M', 
                   {
                     'page_path': event.urlAfterRedirects
                   }
                  );
          }
       }
    )}

  
  ngOnInit(): void {
    const oas = document.querySelector('ng-uui-oas') || new Element();

    oas.addEventListener('user', (event: any) => {
      if (event.detail) {
        this.loadRouting = true;
      }
    });

    oas.addEventListener('option', (event: any) => {
      if (event.detail) {
        setTimeout(()=>(this.router.navigate([event.detail.Url])),50 )
        ;
      }
    });

    oas.addEventListener('logout', (event: any) => {
      if (event.detail) {
        console.log(event.detail);
      }
    });

  }
}