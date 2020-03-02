import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import{ JWT } from '../model/Jwt.model';
import { API } from '../../environments/api';


@Injectable({providedIn: 'root'})

export class LoginService{

    constructor(private http: HttpClient){}

    autenticar(email:string, senha:string): Observable<JWT>{
        return  this.http.post<JWT>(API+"/auth", {email, senha});
    }
}