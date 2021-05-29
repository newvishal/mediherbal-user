import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

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
    ],
  },
  {
    path: 'about',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Pages/About-us/about-us.module').then(
            (m) => m.AboutUsModule
          ),
      },
    ],
  },
  {
    path: 'contact',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Pages/Contact-us/contact-us.module').then(
            (m) => m.ContactUsModule
          ),
      },
    ],
  },
  {
    path: 'product/:type',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Pages/product/product.module').then((m) => m.ProductModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
