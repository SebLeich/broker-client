import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RootComponent } from "./components/root/root.component";

const routes: Routes = [{path: "broker-angular", component: RootComponent, pathMatch: "full"}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
