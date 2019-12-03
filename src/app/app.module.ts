import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatDialogModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatTableModule,
  MatChipsModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatStepperModule,
  MatGridListModule,
  MatPaginatorModule,
  MatCheckboxModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { BackEndService } from "./services/backend-service";
import { RootComponent } from "./components/root/root.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { StartpageComponent } from "./components/startpage/startpage.component";
import { UseCaseSelectionComponent } from "./components/use-case-selection/use-case-selection.component";
import { RegisterComponent } from "./components/register/register.component";
import { ProjectDescriptionComponent } from "./components/project-description/project-description.component";
import { LoginComponent } from './components/login/login.component';
import { DetailviewComponent } from './components/detailview/detailview.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { ServiceCategoryPipe } from './pipes/servicecategory.pipe';
import { ServiceProviderPipe } from './pipes/serviceprovider.pipe';
import { ServiceModelPipe } from './pipes/servicemodel.pipe';
import { ManageServicesComponent } from './components/manage-services/manage-services.component';
import { ServicePreviewComponent } from './components/service-preview/service-preview.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    RootComponent,
    NavbarComponent,
    StartpageComponent,
    UseCaseSelectionComponent,
    RegisterComponent,
    ProjectDescriptionComponent,
    LoginComponent,
    DetailviewComponent,
    UserDetailComponent,
    AdministrationComponent,
    AddServiceComponent,
    ServiceCategoryPipe,
    ServiceProviderPipe,
    ServiceModelPipe,
    ManageServicesComponent,
    ServicePreviewComponent
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
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatTableModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatStepperModule,
    MatGridListModule,
    MatPaginatorModule,
    MatCheckboxModule,
    ChartsModule
  ],
  providers: [BackEndService],
  bootstrap: [RootComponent],
  entryComponents: [
    LoginComponent,
    RegisterComponent,
    UserDetailComponent
  ]
})

export class AppModule {}
