import { Component } from '@angular/core';

// Initialization for ES Users
import {
  Collapse,
  initTE,
} from "tw-elements";


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  ngAfterViewInit() {

    initTE({ Collapse });

  }
}