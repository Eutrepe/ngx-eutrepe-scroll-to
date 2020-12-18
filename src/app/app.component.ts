import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NgxEutrepeScrollToService, IScrollToConfig } from 'ngx-eutrepe-scroll-to';

@Component({
  selector: 'eutrepe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild("test", {read: ElementRef, static: true}) test: ElementRef;

  constructor(private ngxEutrepeScrollToService: NgxEutrepeScrollToService){}

  private config: IScrollToConfig = {
    easing: 'linear',
    duration: 3000,
    offset: 100,
    onStart: this.onStart,
    onEnd: this.onEnd,
    onStartParams: ['some_text', 1, true],
    onEndParams: [100, false],
    onBreakParams: ['Eutrepe'],
    onBreak: this.onBreak
    }

  ngAfterViewInit() {

    setTimeout(() => {
      this.ngxEutrepeScrollToService.scrollTo(this.test.nativeElement, this.config);
    }, 2000);
  }


  onStart(arg1, arg2, arg3) {
    console.log(arg1); // 'some_text'
    console.log(arg2); // 1
    console.log(arg3); // true
    console.log('start scrolling');
  }

  onEnd(arg1, arg2) {
    console.log(arg1); // 100
    console.log(arg2); // false
    console.log('finish scrolling');
  }

  onBreak(arg1) {
    console.log('break', arg1);  // Eutrepe
  }
}
