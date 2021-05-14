import { NgModule } from "@angular/core";
import { LoginRoutinModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";

@NgModule({
  imports:[LoginRoutinModule],declarations:[LoginComponent]
})
export class LoginModule{}
