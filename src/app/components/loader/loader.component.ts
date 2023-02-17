import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  // @Input() data;
  headerMessage: string;
  loaderMessage: string;

  constructor() {}

  ngOnInit() {
    this.headerMessage = 'Please wait'
    this.loaderMessage = 'We are fetching details.'
    // if (this.data) {
    //   this.headerMessage = this.data.headerMessage || this.headerMessage;
    //   this.loaderMessage = this.data.loaderMessage || this.loaderMessage;
    // }
  }
}
