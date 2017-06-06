import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { Sessions } from '../sessions/sessions';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = HomePage;
  tab3Root = Sessions;

  constructor() {

  }
}
