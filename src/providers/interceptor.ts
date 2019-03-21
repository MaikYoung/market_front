import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import {TokenService} from './token-service';

const HTTP_401_UNAUTHORIZED = 401;

@Injectable()
export class RequestsInterceptor implements HttpInterceptor {

    private tokenService: TokenService;

    constructor(private injector: Injector) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.tokenService = this.injector.get(TokenService);
        let requestToSend = req;
        // Get the auth header from the service.
        return Observable.fromPromise(this.tokenService.getToken()).mergeMap(token => {

            if(token){
                requestToSend = req.clone({headers: req.headers.set("Authorization", `JWT ${token}`)});
            }
                return next.handle(requestToSend).catch(response => {
                    if (response instanceof HttpErrorResponse && response.status == HTTP_401_UNAUTHORIZED) {
                        this.tokenService.setToken(null);
                        // this.app.getRootNav().push('login-page');
                    }
                    try {
                        return Observable.throw(JSON.parse(response.error));
                    } catch (e) {
                        return Observable.throw(response);
                    }
                });


          });

    }

}