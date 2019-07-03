import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxEutrepeScrollToDirective } from 'ngx-eutrepe-scroll-to';

import { AppComponent } from './app.component';
import { WINDOW } from 'projects/ngx-eutrepe-scroll-to/src/public-api';

@NgModule({
  declarations: [
    AppComponent,
    NgxEutrepeScrollToDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {provide: WINDOW, useValue: window}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
