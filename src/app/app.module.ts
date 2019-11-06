import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material";

import { AppRoutingModule } from "./app-routing.module";
import { UseCaseListComponent } from "./use-case-list-component/use-case-list.component";
import { UseCaseHistoryComponent } from "./use-case-history-component/use-case-history.component";
import { UseCaseService } from "./services/use-case-service";
import { RootComponent } from "./components/root/root.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { StartpageComponent } from "./components/startpage/startpage.component";
import { UseCaseSelectionComponent } from "./components/use-case-selection/use-case-selection.component";
import { RegisterComponent } from "./components/register/register.component";
import { ProjectDescriptionComponent } from "./components/project-description/project-description.component";

@NgModule({
  declarations: [
    UseCaseListComponent,
    UseCaseHistoryComponent,
    RootComponent,
    NavbarComponent,
    StartpageComponent,
    UseCaseSelectionComponent,
    RegisterComponent,
    ProjectDescriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [UseCaseService],
  bootstrap: [RootComponent],
  entryComponents: [RegisterComponent]
})
export class AppModule {}
