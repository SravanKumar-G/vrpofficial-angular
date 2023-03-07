import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Injectable()
export class CatchErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
      request: HttpRequest<any>,
      next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      console.log(err);
      if (err.status === 401) {
        // auto logout if 401 response returned from api
            localStorage.clear();
            this.router.navigate(['/login']);
            Swal.fire('Error', 'Session timed out..!, please login again to continue', 'error')
      }
      const error = err.error || err.statusText;
      return throwError(error);
    }));
  }
}
