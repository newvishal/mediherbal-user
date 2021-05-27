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
  ProductData;
  data;
  showImage;
  imageShown;
  productType;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      if (res.id) {
        if (res.type === 'single') {
          this.productType = 'single';
          this.store
            .select('HomeSection')
            .pipe(
              take(1),
              pluck('products'),
              map((products) => {
                return products.filter((product) => product.id === res.id);
              }),
              tap((product: any) => {
                this.ProductData = {
                  ...product[0],
                  quantity: 1,
                  selectedOption: {
                    price: product[0].product_type[0].price,
                    fake_price: product[0].product_type[0].fake_price,
                    product_id: product[0].product_type[0].product_id,
                  },
                };
                this.imageShown = this.ProductData.products_images[0];
              })
            )
            .subscribe((res) => {});
        }
        if (res.type === 'combo') {
          this.productType = 'combo';
          this.store
            .select('HomeSection')
            .pipe(
              take(1),
              pluck('comboProduct'),
              map((products) => {
                return products.filter((product) => product.id === res.id);
              }),
              tap((comboProduct) => {
                this.ProductData = {
                  ...comboProduct[0],
                  quantity: 1,
                  products: [],
                };
                this.imageShown = this.ProductData.products_images[0];
                this.data = comboProduct[0];
                this.data.products.map((productList, index) => {
                  this.store
                    .select('HomeSection')
                    .pipe(
                      take(1),
                      pluck('products'),
                      map((products) => {
                        return products.filter(
                          (product) => product.id === productList.id
                        );
                      }),
                      tap((product: any) => {
                        product[0].product_type.map((type, i) => {
                          if (type.product_id === productList.product_id) {
                            this.ProductData.products[i] = {
                              ...this.data.products[i],
                              product_name: product[0].product_name,
                              product_type: type.name,
                              price: type.price,
                            };
                          }
                        });
                      })
                    )
                    .subscribe((res) => {});
                });
              })
            )
            .subscribe((res) => {});
        }
      }
    });
    console.log(this.ProductData);
  }
  changeImage(link) {
    this.imageShown = link;
  }
  addToCart() {
    if (this.productType === 'single') {
      console.log(this.ProductData.selectedOption);
      console.log(this.ProductData.quantity);
    }
    if (this.productType === 'combo') {
      console.log(this.ProductData.quantity);
    }
  }
  addItem() {
    this.ProductData.quantity = this.ProductData.quantity + 1;
  }
  removeItem() {
    if (this.ProductData.quantity > 1) {
      this.ProductData.quantity = this.ProductData.quantity - 1;
    }
  }
  changeTag1(evt, index) {
    this.ProductData.product_type.map((res) => {
      if (res.product_id === evt) {
        this.ProductData.selectedOption = {
          ...this.ProductData.selectedOption,
          price: res.price,
          fake_price: res.fake_price,
          product_id: res.product_id,
        };
      }
    });
    this.ProductData.quantity = 1;
  }
}
