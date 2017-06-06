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
import { CriteriaListPage } from '../pages/criteria/criteria-list';
import { Drill } from '../pages/drill/drill';
import { Drills } from '../pages/drills/drills';
import { Sessions } from '../pages/sessions/sessions';
import { SessionDrill } from '../pages/session-drill/session-drill';
import { SessionDrills } from '../pages/session-drills/session-drills';
import { SessionService } from '../providers/session-service';
import { DrillService } from '../providers/drill-service';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    Drill,
    Drills,
    SessionDrill,
    SessionDrills,
    Sessions,
    CriteriaListPage
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
    Drill,
    Drills,
    SessionDrill,
    SessionDrills,
    Sessions,
    CriteriaListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SessionService,
    DrillService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
