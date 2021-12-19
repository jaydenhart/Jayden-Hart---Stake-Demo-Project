import { Component, OnInit, VERSION } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  /**
   * @constructor
   * @description Injects services
   */
  constructor(private titleService: Title) {}

  /**
   * @name ngOnInit
   * @function
   * @returns {void} void
   * @description Sets the document title
   */
  ngOnInit(): void {
    this.titleService.setTitle('Jayden Hart - Stake Demo');
  }
}
