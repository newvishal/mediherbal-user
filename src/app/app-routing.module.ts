import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PolicyComponent } from './Pages/policy/policy.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./auth/Pages/signup/signup.module').then((m) => m.SignUpModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/Pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./auth/Pages/forgot-passwword/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
  },
  {
    path: 'home',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'about-us',
        loadChildren: () =>
          import('./Pages/About-us/about-us.module').then(
            (m) => m.AboutUsModule
          ),
      },
      {
        path: 'contact',

        loadChildren: () =>
          import('./Pages/Contact-us/contact-us.module').then(
            (m) => m.ContactUsModule
          ),
      },
      {
        path: 'product/:type',

        loadChildren: () =>
          import('./Pages/product/product.module').then((m) => m.ProductModule),
      },
      {
        path: 'cart',

        loadChildren: () =>
          import('./Pages/cart/cart.module').then((m) => m.CartModule),
      },
      {
        path: 'user-address',
        loadChildren: () =>
          import('./Pages/user-address/user-address.module').then(
            (m) => m.UserAddressModule
          ),
      },
      {
        path: 'checkout',
        loadChildren: () =>
          import('./Pages/checkout/checkout.module').then(
            (m) => m.CheckoutModule
          ),
      },
      {
        path: 'order',
        loadChildren: () =>
          import('./Pages/order/order.module').then((m) => m.OrderModule),
      },
    ],
  },
  {
    path: 'policy/:type',
    component: PolicyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
