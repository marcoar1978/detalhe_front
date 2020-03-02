import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fechamento } from '../model/fechamento.model';
import { Pgto } from '../model/pgto.model';
import { Observable } from 'rxjs';

import { API } from '../../environments/api';


@Injectable({providedIn: 'root'})
export class FechamentoService{

 constructor(private http: HttpClient){}

 listaFechamentos(){

     return this.http.get<Fechamento[]>(API + '/fechamento/lista');
 }

 addPgto(pgto:Pgto): Observable<Response>{
     
    return this.http.post<Response>(API + '/fechamento/addPgto', pgto);
 }

}


