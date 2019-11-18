import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule, MatIconModule, MatToolbarModule, MatCardModule, MatDividerModule, MatFormFieldModule,
  MatInputModule,
  MatButtonModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { UseCaseHistoryComponent } from "./components/use-case-history-component/use-case-history.component";
import { UseCaseService } from "./services/use-case-service";
import { RootComponent } from "./components/root/root.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { StartpageComponent } from "./components/startpage/startpage.component";
import { UseCaseSelectionComponent } from "./components/use-case-selection/use-case-selection.component";
import { RegisterComponent } from "./components/register/register.component";
import { ProjectDescriptionComponent } from "./components/project-description/project-description.component";
import { UseCaseComponent } from './use-case/use-case.component';
import { UseCaseDirective } from './directives/use-case.directive';
import { UseCaseHistoryDirective } from './directives/use-case-history.directive';
import { LoginComponent } from './components/login/login.component';
import { TimelineComponent } from './components/timeline/timeline.component';

@NgModule({
  declarations: [
    UseCaseHistoryComponent,
    RootComponent,
    NavbarComponent,
    StartpageComponent,
    UseCaseSelectionComponent,
    RegisterComponent,
    ProjectDescriptionComponent,
    UseCaseComponent,
    UseCaseDirective,
    UseCaseHistoryDirective,
    LoginComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [UseCaseService],
  bootstrap: [RootComponent],
  entryComponents: [
    RegisterComponent,
    UseCaseComponent,
    LoginComponent
  ]
})
export class AppModule {}
