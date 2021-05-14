import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/Module/shared/shared.module";
import { SignUpRoutingModule } from "./signup-routing.module";
import { SignupComponent } from "./signup.component";

@NgModule({
  imports:[SignUpRoutingModule,SharedModule],declarations:[SignupComponent]
})
export class SignUpModule{}
