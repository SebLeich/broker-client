import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { QuillModule } from "ngx-quill";
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
  MatCheckboxModule,
  MatSortModule,
  MatMenuModule,
  MatSliderModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTabsModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { BackEndService } from "./services/backend-service";
import { RootComponent } from "./components/root/root.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { StartpageComponent } from "./components/startpage/startpage.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { UserDetailComponent } from "./components/user-detail/user-detail.component";
import { AdministrationComponent } from "./components/administration/administration.component";
import { ServiceProviderPipe } from "./pipes/serviceprovider.pipe";
import { ServiceModelPipe } from "./pipes/servicemodel.pipe";
import { ManageServicesComponent } from "./components/manage-services/manage-services.component";
import { ChartsModule } from "ng2-charts";
import { ProjectOverviewComponent } from './components/project-overview/project-overview.component';
import { ProjectDetailviewComponent } from './components/project-detailview/project-detailview.component';
import { ProjectEditviewComponent } from './components/project-editview/project-editview.component';
import { SearchvectorEditviewComponent } from './components/searchvector-editview/searchvector-editview.component';
import { MatchingresultsOverviewComponent } from './components/matchingresults-overview/matchingresults-overview.component';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { ServiceCreateViewComponent } from './components/service-create-view/service-create-view.component';
import { ServiceEditViewComponent } from './components/service-edit-view/service-edit-view.component';
import { ServiceEditViewInnerComponent } from './components/service-edit-view-inner/service-edit-view-inner.component';
import { MatchingResponseDetailViewComponent } from './components/matching-response-detail-view/matching-response-detail-view.component';
import { ServiceDetailViewComponent } from './components/service-detail-view/service-detail-view.component';
import { UseCaseManagementViewComponent } from './components/use-case-management-view/use-case-management-view.component';
import { ImprintComponent } from './components/imprint/imprint.component';

@NgModule({
  declarations: [
    RootComponent,
    NavbarComponent,
    StartpageComponent,
    RegisterComponent,
    LoginComponent,
    UserDetailComponent,
    AdministrationComponent,
    ServiceProviderPipe,
    ServiceModelPipe,
    ManageServicesComponent,
    ProjectOverviewComponent,
    ProjectDetailviewComponent,
    ProjectEditviewComponent,
    SearchvectorEditviewComponent,
    MatchingresultsOverviewComponent,
    PopUpComponent,
    ServiceCreateViewComponent,
    ServiceEditViewComponent,
    ServiceEditViewInnerComponent,
    MatchingResponseDetailViewComponent,
    ServiceDetailViewComponent,
    UseCaseManagementViewComponent,
    ImprintComponent
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
    ChartsModule,
    MatSortModule,
    MatMenuModule,
    MatSliderModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTabsModule,
    QuillModule.forRoot()
  ],
  providers: [BackEndService],
  bootstrap: [RootComponent],
  entryComponents: [LoginComponent, PopUpComponent, RegisterComponent, UserDetailComponent]
})
export class AppModule {}
