import { Component, OnInit } from '@angular/core';
import { NgxEutrepeScrollToService } from 'projects/ngx-eutrepe-scroll-to/src/public-api';

@Component({
  selector: 'eutrepe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'EutrepeScrollToLibrary';

  constructor(private ngxEutrepeScrollToService: NgxEutrepeScrollToService){}

  ngOnInit() {
    this.ngxEutrepeScrollToService.scrollTo(10000, {
      duration: 10000,
      onEnd: () => {
        console.log('END')
      }
    });
  }
}
