import { NgModule } from '@angular/core';
import { NgbAccordion, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/shared/Module/material/material.module';
import { SharedModule } from 'src/app/shared/Module/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeService } from './service/home.service';
import { BannerComponent } from './Components/banner/banner.component';
import { ProductSliderComponent } from './Components/product-slider/product-slider.component';
import { ProductCardSliderComponent } from './Components/product-card-slider/product-card-slider.component';
import { ComboProductSliderComponent } from './Components/combo-product-slider/combo-product-slider.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  imports: [SharedModule, MaterialModule, HomeRoutingModule, NgbModule],
  declarations: [
    HomeComponent,
    BannerComponent,
    ProductSliderComponent,
    ProductCardSliderComponent,
    ComboProductSliderComponent,
  ],
  providers: [HomeService],
})
export class HomeModule {}
