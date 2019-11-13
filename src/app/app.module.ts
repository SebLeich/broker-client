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
import { UseCaseListComponent } from "./use-case-list-component/use-case-list.component";
import { UseCaseHistoryComponent } from "./use-case-history-component/use-case-history.component";
import { UseCaseService } from "./services/use-case-service";
import { RootComponent } from "./components/root/root.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { StartpageComponent } from "./components/startpage/startpage.component";
import { UseCaseSelectionComponent } from "./components/use-case-selection/use-case-selection.component";
import { RegisterComponent } from "./components/register/register.component";
import { ProjectDescriptionComponent } from "./components/project-description/project-description.component";
import { UseCaseComponent } from './use-case/use-case.component';
import { UseCaseDirective } from './use-case.directive';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    UseCaseListComponent,
    UseCaseHistoryComponent,
    RootComponent,
    NavbarComponent,
    StartpageComponent,
    UseCaseSelectionComponent,
    RegisterComponent,
    ProjectDescriptionComponent,
    UseCaseComponent,
    UseCaseDirective,
    LoginComponent
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
