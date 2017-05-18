import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { SessionListPage } from '../session/session-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = HomePage;
  tab3Root = SessionListPage;

  constructor() {

  }
}
