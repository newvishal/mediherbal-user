import { NgModule } from "@angular/core";
import { SignUpRoutingModule } from "./signup-routing.module";
import { SignupComponent } from "./signup.component";

@NgModule({
  imports:[SignUpRoutingModule],declarations:[SignupComponent]
})
export class SignUpModule{}
