import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NgxEutrepeScrollToModule } from './modules/ngx-eutrepe-scroll-to.module';
import { NgxEutrepeScrollToService } from './modules/ngx-eutrepe-scroll-to.service';
import { WINDOW_SCROLL_TO } from './modules/windowToken/window-token';

@NgModule({
    declarations: [
      AppComponent
    ],
    imports:      [
        BrowserModule,
        BrowserAnimationsModule,
        NgxEutrepeScrollToModule
    ],
    providers: [
      {provide: WINDOW_SCROLL_TO, useValue: window},
      NgxEutrepeScrollToService
    ],
    bootstrap: [ AppComponent ],
    exports: []
})
export class AppModule {
}

