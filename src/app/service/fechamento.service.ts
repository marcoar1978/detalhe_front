import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fechamento } from '../model/fechamento.model';
import { Pgto } from '../model/pgto.model';
import { Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class FechamentoService{

 API:string = "http://ec2-54-82-227-244.compute-1.amazonaws.com";
 //API:string = "http://localhost:8080";

 constructor(private http: HttpClient){}

 listaFechamentos(){

     return this.http.get<Fechamento[]>(this.API + '/fechamento/lista');
 }

 addPgto(pgto:Pgto): Observable<Response>{
     
    return this.http.post<Response>(this.API + '/fechamento/addPgto', pgto);
 }

}


