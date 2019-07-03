import { Directive, Input, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { NgxEutrepeScrollToService } from './ngx-eutrepe-scroll-to.service';

/** @dynamic */
@Directive({
  selector: '[ngxEutrepScrollTo]'
})
export class NgxEutrepeScrollToDirective {
  @Input('ngxEutrepScrollTo') eutrepeScrollToTarget: string | number = 100;
  @Input() eutrepeScrollToEasing: string = 'easeInOutQuad';
  @Input() eutrepeScrollToDuration: number = 3500;
  @Input() eutrepeScrollToOffset: number   = 0;
  @Input() eutrepeOnStartScrolling: Function = () => {console.log('START')};
  @Input() eutrepeOnEndScrolling: Function = () => {console.log('END')};


  constructor(
    private ngxEutrepeScrollToService: NgxEutrepeScrollToService,
    @Inject(DOCUMENT) private document: Document
    ) { }

  @HostListener('click', ['$event']) onClick = (e) => {
      e.preventDefault();

      let target: number | HTMLElement = null;

      if (typeof(this.eutrepeScrollToTarget) === 'string') {
        target = this.document.querySelector(this.eutrepeScrollToTarget as string) as HTMLElement;
      } else if (typeof(this.eutrepeScrollToTarget) === 'number') {
        target = this.eutrepeScrollToTarget
      } else {
        return false;
      }

      this.ngxEutrepeScrollToService.scrollTo(
        target,
        {
          duration: this.eutrepeScrollToDuration,
          offset: this.eutrepeScrollToOffset,
          easing: this.eutrepeScrollToEasing,
          onStart: this.eutrepeOnStartScrolling,
          onEnd: this.eutrepeOnEndScrolling
        }
      );
  }
}
