import {
  HttpErrorResponse,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnakbarService } from '../shared/Service/snakBar.service';
import { UserDataService } from '../shared/service/userData.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private userData: UserDataService,
    private router: Router,
    private snackbar: SnakbarService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const UserInfo = this.userData.getUserData();
    if (UserInfo) {
      const header = new HttpHeaders({
        Authorization: `Bearer ${UserInfo.token}`,
      });
      const modifiedReq = req.clone({
        headers: header,
      });

      return next.handle(modifiedReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            this.snackbar.showSnackBar(error.error.error, 'danger');
          } else {
            this.snackbar.showSnackBar(error.error.error, 'danger');
          }
          return throwError(error.error.error);
        })
      );
    } else {
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            this.snackbar.showSnackBar(error.error.error, 'danger');
          } else {
            this.router.navigate(['/login']);
          }
          return throwError(error.error.error);
        })
      );
    }
  }
}
