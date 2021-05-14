import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/Module/shared/shared.module";
import { LoginRoutinModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";

@NgModule({
  imports:[LoginRoutinModule,SharedModule],declarations:[LoginComponent]
})
export class LoginModule{}
