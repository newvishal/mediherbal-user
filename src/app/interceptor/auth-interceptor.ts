import {
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../shared/service/userData.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userData: UserDataService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const UserInfo = this.userData.getUserData();
    if (UserInfo) {
      const header = new HttpHeaders({
        Authorization: `Bearer ${UserInfo.token}`,
      });
      const modifiedReq = req.clone({
        headers: header,
      });

      return next.handle(modifiedReq);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
