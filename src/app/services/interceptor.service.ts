import { catchError } from "rxjs/operators";
import { throwError as observableThrowError, Observable, EMPTY } from "rxjs";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { APP_SERVER_OPTIONS } from "../config";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      req.url.indexOf("assets") != -1 ||
      req.url.indexOf("jsonbase") != -1
    ) {
      return next.handle(req).pipe(
        catchError((err: any) => {
          console.log("Profile pic err", err);
          return observableThrowError(err);
        })
      );
    }

    const HOST = APP_SERVER_OPTIONS.host + ':' + APP_SERVER_OPTIONS.port; 

    const headersToSet = {
      // Authorization: `Bearer ${this.user.getAuthToken()}`,
    };
    req = req.clone({
      setHeaders: headersToSet,
      url: HOST + req.url,
    });
    console.log("INTERCEPTOR URL", req.url);
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status == 401) {
          // this.refreshAuthTokenAndRetry(req, next);
        }
        return EMPTY;
      })
    );
  }

  // refreshAuthTokenAndRetry(req: any, next: any) {
  //   return this.user.refreshAuthToken().pipe(
  //     switchMap((res: HttpResponse<AuthResp>) => {
  //       if (res.status == 200 && res.body.success) {
  //         req = req.clone({
  //           setHeaders: {
  //             Authorization: `Bearer ${res.body.authorization}`,
  //           },
  //         });
  //         return next.handle(req);
  //       } else {
  //         this.user.logout();
  //         return EMPTY;
  //       }
  //     })
  //   );
  // }
}
