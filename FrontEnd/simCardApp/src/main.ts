import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // Assurez-vous que le chemin est correct
import { appConfig } from './app/app.config'; // Assurez-vous que le chemin est correct
import { AppComponent } from './app/app.component';

// Activez le mode de production pour une meilleure performance des applications Angular.
enableProdMode();

// Créez l'application Angular et configurez-la avec votre module racine.
platformBrowserDynamic([{ provide: 'appConfig', useValue: appConfig }])
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
