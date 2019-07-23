# NgxEutrepeScrollTo

* Directive and Servece for Angular to scroll to section
* Based on: [pawelgrzybek.com](https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/)
* Angular 4 version

## Installation

`npm i --save @eutrepe/scroll-to@4`


# Usage

### 1) Register the `NgxEutrepeScrollToModule` in your app module.
 > `import { NgxEutrepeScrollToModule } from '@eutrepe/scroll-to'`

  ```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxEutrepeScrollToModule, NgxEutrepeScrollToService } from '@eutrepe/scroll-to';

import { AppComponent } from './app.component';
import { WINDOW } from '@eutrepe/scroll-to';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxEutrepeScrollToModule
  ],
  providers: [
    {provide: WINDOW, useValue: window},
    NgxEutrepeScrollToService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 ```

 <br /><br />

### 2) Use the directive `(ngxEutrepScrollTo)`

#### Basic

```html
<button [ngxEutrepScrollTo]="'#target'">Scroll To</button>

<div id="target"></div>
```
  or

```html
<button [ngxEutrepScrollTo]="1000">Scroll To</button>
```


#### Advanced

```html
<button
    [ngxEutrepScrollTo]="'#target'"
    [eutrepeScrollToEasing]="'linear'"
    [eutrepeScrollToDuration]="3000"
    [eutrepeScrollToOffset]="100"
    [eutrepeOnStartScrolling]="onStart"
    [eutrepeOnEndScrolling]="onEnd"
    [eutrepeOnStartScrollingParams]="['some_text', 1, true]"
    [eutrepeOnEndScrollingParams]="[100, false]"
>Scroll To</button>


<div id="target"></div>
```

```typescript
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
```
<br /><br />

### 3) Use the service `(NgxEutrepeScrollToService)`


```html
<h2 #test>This is target element</h2>
```

```typescript
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
        onEnd: this.onEnd,
        onStartParams: ['some_text', 1, true],
        onEndParams: [100, false]
        });
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
  }
```

# API

#### Directive:

`import { NgxEutrepeScrollToModule } from '@eutrepe/scroll-to'`

| Input                            | Type              | Required                           | Description                                                            |
| -------------------------------- | ----------------- | ---------------------------------- | ---------------------------------------------------------------------- |
| [ngxEutrepScrollTo]              | string or number  | **YES**                            | Target selector name or number pixels to scroll                        |
| [eutrepeScrollToEasing]          | string            | Optional, default: 'easeInOutQuad' | Easing type (more info in EASING section)                              |
| [eutrepeScrollToDuration]        | number            | Optional, default: 1000            | Easing time in milliseconds                                            |
| [eutrepeScrollToOffset]          | number            | Optional, default: 0               | Offset in px to target element                                         |
| [eutrepeOnStartScrolling]        | Function          | Optional, default: null            | The function is started immediately after the start of scrolling       |
| [eutrepeOnEndScrolling]          | Function          | Optional, default: null            | The function is started immediately after the end of scrolling         |
| [eutrepeOnStartScrollingParams]  | Array             | Optional, default: []              | Array of custom argumments for onStart callback                        |
| [eutrepeOnEndScrollingParams]    | Array             | Optional, default: []              | Array of custom argumments for onStart callback                        |

<br />

#### Service:

`import { NgxEutrepeScrollToService } from '@eutrepe/scroll-to'`

```typescript
scrollTo(target: HTMLElement | number, config?: IScrollToConfig) : void
```

```typescript
IScrollToConfig  {
  duration?: number,
  offset?: number,
  easing?: string,
  onEnd?: Function,
  onStart?: Function,
  onStartParams?: Array<any>
  onEndParams?: Array<any>
}
```

<br />

#### Easing:


| Name             | Function                                                                   |
| ---------------- | -------------------------------------------------------------------------- |
| linear           | return t;                                                                  |
| easeInQuad       | return t * t;                                                              |
| easeOutQuad      | return t * (2 - t);                                                        |
| easeInOutQuad    | return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;                         |
| easeInCubic      | return t * t * t;                                                          |
| easeOutCubic     | return (--t) * t * t + 1;                                                  |
| easeInOutCubic   | return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;  |
| easeInQuart      | return t * t * t * t;                                                      |
| easeOutQuart     | return 1 - (--t) * t * t * t;                                              |
| easeInOutQuart   | return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t             |
| easeInQuint      | return t * t * t * t * t;                                                  |
| easeOutQuint     | return 1 + (--t) * t * t * t * t;                                          |
| easeInOutQuint   | return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;  |

<br />