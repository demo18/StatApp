import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { PlayerListPage } from '../pages/player-list/player-list';
//import { CriteriaListPage } from '../pages/criteria-list/criteria-list';
import { SessionListPage } from '../pages/session/session-list';
import { DrillListPage } from '../pages/drill/drill-list';
import { DrillPage } from '../pages/drill/drill-form';
import { SessionPage } from '../pages/session/session-form';
import { SessionService } from '../providers/session-service';
import { StatFormPage } from '../pages/stat/stat-form';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    ItemDetailsPage,
    PlayerListPage,
    DrillPage,
    SessionListPage,
    SessionPage,
    StatFormPage,
    DrillListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      loadingSpinner: 'dots'
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    ItemDetailsPage,
    PlayerListPage,
    DrillPage,
    SessionListPage,
    DrillListPage,
    SessionPage,
    StatFormPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SessionService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
