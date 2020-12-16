import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import { NgxEutrepeScrollToDirective } from 'ngx-eutrepe-scroll-to';

import { AppComponent } from './app.component';
import { WINDOW_SCROLL_TO, NgxEutrepeScrollToModule } from 'ngx-eutrepe-scroll-to';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxEutrepeScrollToModule
  ],
  providers: [
    {provide: WINDOW_SCROLL_TO, useValue: window}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
