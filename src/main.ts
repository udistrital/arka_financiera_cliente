import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const menu = [
  { Nombre: "Inicio", Icono: "home", Url: "pages", Opciones: Array(0) },
  { Id: 664, Nombre: "Entradas", Icono: "account_box", Url: "pages/informacion_basica", TipoOpcion: "Menú", Opciones: null },
  
]; 

localStorage.setItem('menu', btoa(JSON.stringify(menu)));


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

