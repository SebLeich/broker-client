import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-component/app.component';
import { UseCaseListComponent } from "./use-case-list-component/use-case-list.component";
import { UseCaseHistoryComponent } from "./use-case-history-component/use-case-history.component";
import { UseCaseService } from './services/use-case-service';

@NgModule({
  declarations: [
    AppComponent,
    UseCaseListComponent,
    UseCaseHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    UseCaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
