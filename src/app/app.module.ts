import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpModule } from './auth/Pages/signup/signup.module';
import { LoginModule } from './auth/Pages/login/login.module';
import { ForgotPasswordModule } from './auth/Pages/forgot-passwword/forgot-password.module';
import { MaterialModule } from './shared/Module/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppReducer } from './store/app.reducer';
import { AuthEffects } from './auth/store/Auth.effects';
import { HomeModule } from './Pages/home/home.module';
import { ContactUsModule } from './Pages/Contact-us/contact-us.module';
import { AboutUsModule } from './Pages/About-us/about-us.module';
import { HomeEffects } from './Pages/home/store/home.effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './Components/header/header.component';
import { SideBarComponent } from './Components/side-bar/side-bar.component';
import { ProductModule } from './Pages/product/product.module';
import { FooterComponent } from './Components/footer/footer.component';
import { PolicyComponent } from './Pages/policy/policy.component';
import { CartModule } from './Pages/cart/cart.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    FooterComponent,
    PolicyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SignUpModule,
    LoginModule,
    ForgotPasswordModule,
    MaterialModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(AppReducer),
    EffectsModule.forRoot([AuthEffects, HomeEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HomeModule,
    ContactUsModule,
    AboutUsModule,
    NgbModule,
    ProductModule,
    CartModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
