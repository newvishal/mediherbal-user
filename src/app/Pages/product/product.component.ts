import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map, pluck, take, tap } from 'rxjs/operators';
import { ProductInterface } from '../Interface/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}
  productType;
  ProductList;
  data;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      if (res.type === 'single') {
        this.productType = 'single';
        this.store
          .select('HomeSection')
          .pipe(
            take(1),
            pluck('products'),
            tap((products: any) => {
              this.ProductList = [];
              console.log(products);
              /*   this.ProductList = products; */
              products.map((res, index) => {
                this.ProductList[index] = {
                  ...res,
                  addToCart: false,
                  quantity: 1,
                  selectedOption: {
                    price: res.product_type[0].price,
                    fake_price: res.product_type[0].fake_price,
                    product_id: res.product_type[0].product_id,
                  },
                };
              });
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
            tap((comboProduct) => {
              this.ProductList = comboProduct;
              this.data = [];
              this.ProductList.map((products, index) => {
                this.data.push({
                  ...products,
                  products: [],
                  addToCart: false,
                  quantity: 1,
                });
              });
              this.ProductList.map((res, index) => {
                if (res.products) {
                  res.products.map((productType, i) => {
                    this.store
                      .select('HomeSection')
                      .pipe(
                        take(1),
                        pluck('products'),
                        map((products) => {
                          return products.filter(
                            (product) => product.id === productType.id
                          );
                        }),
                        tap((product: any) => {
                          product[0].product_type.map((type, i) => {
                            if (type.product_id === productType.product_id) {
                              this.data[index].products[i] = {
                                ...this.ProductList[index].products[i],
                                product_name: res.product_name,
                                product_type: type.name,
                                price: type.price,
                              };
                            }
                          });
                        })
                      )
                      .subscribe((res) => {});
                  });
                }
              });
              this.ProductList = [];
              this.ProductList = this.data;
              this.ProductList.map((res, index) => {
                for (let i = 0; i < 10; i++) {
                  this.ProductList.push(res);
                }
              });
            })
          )
          .subscribe((res) => {});
      }
    });
    console.log(this.ProductList);
  }
  addToCart(index) {
    this.ProductList[index].addToCart = true;
    if (this.ProductList[index].quantity == 0) {
      this.addQuantity(index);
    }
  }
  removeQuantity(index) {
    if (this.ProductList[index].quantity >= 1) {
      this.ProductList[index].quantity = this.ProductList[index].quantity - 1;
    }
    if (this.ProductList[index].quantity == 0) {
      this.ProductList[index].addToCart = false;
    }
  }
  addQuantity(index) {
    this.ProductList[index].quantity = this.ProductList[index].quantity + 1;
  }
  changeTag1(evt, index) {
    this.ProductList[index].product_type.map((res) => {
      if (res.product_id === evt) {
        this.ProductList[index].selectedOption = {
          ...this.ProductList[index].selectedOption,
          price: res.price,
          fake_price: res.fake_price,
          product_id: res.product_id,
        };
      }
    });
    this.ProductList[index].addToCart = false;
    this.ProductList[index].quantity = 1;
  }
  navigateToDeatils(id) {
    if (this.productType === 'single') {
      this.router.navigate([`/product-detail/single/${id}`]);
    } else if (this.productType === 'combo') {
      this.router.navigate([`/product-detail/combo/${id}`]);
    }
  }
}
