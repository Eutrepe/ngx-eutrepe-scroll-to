import { Injectable, Inject } from '@angular/core';

import { Easings } from './utility/easings';
import { WINDOW_SCROLL_TO } from './windowToken/window-token';
import { DOCUMENT } from '@angular/common';


export interface IScrollToConfig  {
  duration?: number;
  offset?: number;
  easing?: string;
  onEnd?: Function;
  onStart?: Function;
  onStartParams?: Array<any> | undefined;
  onEndParams?: Array<any> | undefined;
  onBreak?: Function;
  onBreakParams?: Array<any> | undefined;
}

/** @dynamic */
@Injectable()
export class NgxEutrepeScrollToService {

  private defaultConfig: IScrollToConfig = {
    duration: 350,
    offset: 0,
    easing: 'easeInOutQuad',
    onEnd: null,
    onStart: null,
    onStartParams: [],
    onEndParams: [],
    onBreak: null,
    onBreakParams: []
  }

  private settings: IScrollToConfig = null;

  private raf: any;
  private easings = Easings;
  private start: number;
  private startTime: number;
  private isMoved: boolean = false;

  constructor(
      @Inject(WINDOW_SCROLL_TO) private window: Window,
      @Inject(DOCUMENT) private document: Document
    ) {
      if (!this.window) {
        this.window = this.document.defaultView;
      }
    }

  private clearRaf = () => {

    if (this.settings.onBreak && typeof(this.settings.onBreak) === 'function') {
      const arg = this.settings.onBreakParams ? this.settings.onBreakParams : [];
      this.settings.onBreak(...arg);
    }

    this.window.cancelAnimationFrame(this.raf);
    this.window.removeEventListener('resize', this.clearRaf, false);
    this.window.removeEventListener('mousewheel', this.clearRaf, false);
    this.window.removeEventListener('DOMMouseScroll', this.clearRaf, false);
    this.isMoved = false;
  }

  public scrollTo = (
      target: HTMLElement | number,
      config?: IScrollToConfig) : void => {

    this.settings = {...this.defaultConfig, ...config};

    if (this.settings.onStart && typeof(this.settings.onStart) === 'function') {
      const arg = this.settings.onStartParams ? this.settings.onStartParams : [];
      this.settings.onStart(...arg);
    }

    if (this.isMoved) {
      this.clearRaf();
    }

    this.window.addEventListener('resize', this.clearRaf, false);
    this.window.addEventListener('mousewheel', this.clearRaf, false);
    this.window.addEventListener('DOMMouseScroll', this.clearRaf, false);

    this.start = this.window.pageYOffset;
    this.startTime = this.window.performance.now();

    const documentHeight = Math.max(
        this.document.body.scrollHeight,
        this.document.body.offsetHeight,
        this.document.documentElement.clientHeight,
        this.document.documentElement.scrollHeight,
        this.document.documentElement.offsetHeight);

    const windowHeight =
        this.window.innerHeight ||
        this.document.documentElement.clientHeight ||
        this.document.getElementsByTagName('body')[0].clientHeight;

    const destinationOffset: number = (typeof target === 'number' ? target : target.offsetTop) + this.settings.offset;
    const destinationOffsetToScroll: number = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

    this.scroll(this.settings.duration, this.settings.easing, destinationOffsetToScroll, this.settings.onEnd);
  }


    private scroll = (duration: number, easing: string, destinationOffsetToScroll: number, onEnd: Function): void => {
      const now: number = this.window.performance.now();
      const time: number = Math.min(1, ((now - this.startTime) / this.settings.duration));
      const timeFunction: number = this.easings[this.settings.easing](time);

      this.window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - this.start)) + this.start));

      if (this.window.pageYOffset === destinationOffsetToScroll || Math.abs(this.window.pageYOffset - destinationOffsetToScroll) <= 1) {
        if (this.isMoved && this.settings.onEnd && typeof(this.settings.onEnd) === 'function') {
          const arg = this.settings.onEndParams ? this.settings.onEndParams : [];
          this.settings.onEnd(...arg);
        }
        this.isMoved = false;
        return;
      }

      this.isMoved = true;

      this.raf = this.window.requestAnimationFrame(
        () => {
          this.scroll(duration, easing, destinationOffsetToScroll, onEnd);
        }
      );
    };
}
