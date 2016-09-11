
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ROUTES, routingProviders, routingComponents } from './app.routes';
import { ENV_PROVIDERS } from './environment';
import { AppComponent } from './app.component';

import {SimpleNotificationsModule} from "angular2-notifications";
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { NG2_UI_AUTH_PROVIDERS } from 'ng2-ui-auth';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Title } from '@angular/platform-browser';

import { Services } from './services/main.service';
import { FilterBy } from "./filters/filter-by.pipe"
import { FilterSmaller } from "./filters/filter-smaller.pipe"
import { FilterNumber } from "./filters/filter-number.pipe"

const DEFAULT_POST_HEADER: {[name: string]: string} = {
  'Content-Type': 'application/json'
};
const GOOGLE_CLIENT_ID = '8510187061-dscjkbq3gt846hft01m6i9gmdgnkluru.apps.googleusercontent.com';
const FACEBOOK_CLIENT_ID = '1634167186882724'

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    routingComponents,
    AppComponent,
    FilterNumber,
    FilterSmaller,
    FilterBy
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SimpleNotificationsModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    TranslateModule.forRoot({ 
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
    }),
    Ng2BootstrapModule
  ],

  providers: [
    Title,
    routingProviders,
    Services,
    ENV_PROVIDERS,
    NG2_UI_AUTH_PROVIDERS({defaultHeaders: DEFAULT_POST_HEADER, providers: {google: {clientId: GOOGLE_CLIENT_ID}, facebook: {clientId: FACEBOOK_CLIENT_ID}}}),
  ]
})

export class AppModule{}
