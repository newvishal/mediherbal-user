import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/Module/material/material.module';
import { SharedModule } from 'src/app/shared/Module/shared/shared.module';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { AboutService } from './service/aboutUs.service';

@NgModule({
  imports: [SharedModule, MaterialModule, AboutUsRoutingModule],
  declarations: [AboutUsComponent],
  providers: [AboutService],
})
export class AboutUsModule {}
