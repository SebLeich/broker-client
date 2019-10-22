import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RootComponent } from "./components/root/root.component";
import { RegisterComponent } from "./components/register/register.component";

const routes: Routes = [
  { path: "broker-angular", component: RootComponent, pathMatch: "full" },
  { path: "register", component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
