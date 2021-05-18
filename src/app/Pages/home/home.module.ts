import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/Module/material/material.module';
import { SharedModule } from 'src/app/shared/Module/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [SharedModule, MaterialModule, HomeRoutingModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
