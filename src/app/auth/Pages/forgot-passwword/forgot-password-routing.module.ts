import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ForgotPasswwordComponent } from "./forgot-passwword.component";

const forGotPasswordRoues:Routes=[
  {path:"",component:ForgotPasswwordComponent}
]
@NgModule({
imports:[RouterModule.forChild(forGotPasswordRoues)],exports:[RouterModule]
})
export class ForgotPasswordRoutingModule{}
