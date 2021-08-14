import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/Module/material/material.module';
import { SharedModule } from 'src/app/shared/Module/shared/shared.module';
import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsComponent } from './contact-us.component';
import { ContactService } from './services/contact.service';

@NgModule({
  imports: [SharedModule, MaterialModule, ContactUsRoutingModule],
  declarations: [ContactUsComponent],
  providers: [ContactService],
})
export class ContactUsModule {}
