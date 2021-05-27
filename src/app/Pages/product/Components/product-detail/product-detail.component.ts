import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Service/product.service';
import * as fromApp from '../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map, pluck, take, tap } from 'rxjs/operators';
import {
  ComboProductInterface,
  products,
} from 'src/app/Pages/Interface/combo-products.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}
  ProductData: products | ComboProductInterface;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      if (res.id) {
        if (res.type === 'single') {
          this.store
            .select('HomeSection')
            .pipe(
              take(1),
              pluck('products'),
              map((products) => {
                return products.filter((product) => product.id === res.id);
              }),
              tap((product) => {
                this.ProductData = product[0];
              })
            )
            .subscribe((res) => {});
        }
        if (res.type === 'combo') {
          this.store
            .select('HomeSection')
            .pipe(
              take(1),
              pluck('comboProduct'),
              map((products) => {
                return products.filter((product) => product.id === res.id);
              }),
              tap((comboProduct) => {
                this.ProductData = comboProduct[0];
              })
            )
            .subscribe((res) => {});
        }
      }
    });
    console.log(this.ProductData);
  }
}
