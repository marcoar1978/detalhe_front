import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import{ JWT } from '../model/Jwt.model';


@Injectable({providedIn: 'root'})

export class LoginService{

    API:string = "http://ec2-54-82-227-244.compute-1.amazonaws.com";

    constructor(private http: HttpClient){}

    autenticar(email:string, senha:string): Observable<JWT>{
        return  this.http.post<JWT>(this.API+"/auth", {email, senha});
    }
}