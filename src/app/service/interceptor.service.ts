import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent  } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({providedIn: 'root'})
export class InterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(window.localStorage.getItem("tokenDetalhe")){
            const token = window.localStorage.getItem("tokenDetalhe");
            req = req.clone({
                setHeaders: { Authorization:'Bearer '+token}
            });
        }

        return next.handle(req);
    }

}