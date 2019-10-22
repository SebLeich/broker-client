import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { UseCaseListComponent } from "./use-case-list-component/use-case-list.component";
import { UseCaseHistoryComponent } from "./use-case-history-component/use-case-history.component";
import { UseCaseService } from './services/use-case-service';
import { RootComponent } from './components/root/root.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StartpageComponent } from './components/startpage/startpage.component';
import { UseCaseSelectionComponent } from './components/use-case-selection/use-case-selection.component';

@NgModule({
  declarations: [
    UseCaseListComponent,
    UseCaseHistoryComponent,
    RootComponent,
    NavbarComponent,
    StartpageComponent,
    UseCaseSelectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    UseCaseService
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }
