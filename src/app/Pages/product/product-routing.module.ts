import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './Components/product-detail/product-detail.component';
import { ProductComponent } from './product.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: ProductComponent,
  },
  {
    path: 'product-detail/:type/:id',
    component: ProductDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
