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
  @Input() eutrepeScrollToDuration: number = 1000;
  @Input() eutrepeScrollToOffset: number   = 0;
  @Input() eutrepeOnStartScrolling: Function = null;
  @Input() eutrepeOnStartScrollingParams: Array<any> = null;
  @Input() eutrepeOnEndScrolling: Function = null;
  @Input() eutrepeOnEndScrollingParams: Array<any> = null;
  @Input() eutrepeOnBreakScrolling: Function = null;
  @Input() eutrepeOnBreakScrollingParams: Array<any> = null;


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
          onEnd: this.eutrepeOnEndScrolling,
          onStartParams: this.eutrepeOnStartScrollingParams,
          onEndParams: this.eutrepeOnEndScrollingParams,
          onBreak: this.eutrepeOnBreakScrolling,
          onBreakParams: this.eutrepeOnBreakScrollingParams
        }
      );
  }
}
