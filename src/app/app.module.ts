import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxEutrepeScrollToDirective } from '@eutrepe/scroll-to';

import { AppComponent } from './app.component';
import { WINDOW } from '@eutrepe/scroll-to';

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
