import { NgModule } from '@angular/core';
import { NgbAccordion, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/shared/Module/material/material.module';
import { SharedModule } from 'src/app/shared/Module/shared/shared.module';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductService } from './Service/product.service';
import { ProductDetailComponent } from './Components/product-detail/product-detail.component';
import { ImageSliderComponent } from './Components/image-slider/image-slider.component';
import { ReviewsComponent } from './Components/rating-reviews/reviews.component';
import { AddReviewComponent } from './Components/add-review/add-review.component';

@NgModule({
  imports: [SharedModule, MaterialModule, ProductRoutingModule, NgbModule],
  declarations: [
    ProductComponent,
    ProductDetailComponent,
    ImageSliderComponent,
    ReviewsComponent,
    AddReviewComponent,
  ],
  providers: [ProductService],
})
export class ProductModule {}
