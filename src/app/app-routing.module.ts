import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Pages/home/home.module').then((m) => m.HomeModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
