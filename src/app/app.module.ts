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
import { Criteria } from '../pages/criteria/criteria';
import { Criterias } from '../pages/criterias/criterias';
import { Drill } from '../pages/drill/drill';
import { DrillRename } from '../pages/drill-rename/drill-rename';
import { Drills } from '../pages/drills/drills';
import { Sessions } from '../pages/sessions/sessions';
import { SessionDrill } from '../pages/session-drill/session-drill';
import { SessionDrills } from '../pages/session-drills/session-drills';
import { SessionService } from '../providers/session-service';
import { CriteriaService } from '../providers/criteria-service';
import { DrillService } from '../providers/drill-service';
import { ValueTypeService } from '../providers/valueType-service';
import { Parameters } from '../pages/parameters/parameters';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    Drill,
    Drills,
    DrillRename,
    SessionDrill,
    SessionDrills,
    Sessions,
    Criteria,
    Criterias,
    Parameters
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
    DrillRename,
    SessionDrill,
    SessionDrills,
    Sessions,
    Criteria,
    Criterias,
    Parameters
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SessionService,
    DrillService,
    CriteriaService,
    ValueTypeService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
