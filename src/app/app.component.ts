import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NgxEutrepeScrollToService } from '@eutrepe/scroll-to';

@Component({
  selector: 'eutrepe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild("test", {read: ElementRef, static: true}) test: ElementRef;

  constructor(private ngxEutrepeScrollToService: NgxEutrepeScrollToService){}

  ngAfterViewInit() {
    this.ngxEutrepeScrollToService.scrollTo(this.test.nativeElement, {
      easing: 'linear',
      duration: 3000,
      offset: 100,
      onStart: this.onStart,
      onEnd: this.onEnd
    });
  }


  onStart() {
    console.log('start scrolling');
  }

  onEnd() {
    console.log('finish scrolling');
  }
}
