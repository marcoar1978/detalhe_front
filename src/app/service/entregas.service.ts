import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Entrega } from '../model/entrega.model';

@Injectable({providedIn: 'root'})
export class EntregaService{

    //API:string = "http://ec2-54-82-227-244.compute-1.amazonaws.com";
    API:string = "http://localhost:8080";

    constructor(private http: HttpClient){}

    listaEntregas(){
        return this.http.get<Entrega[]>(this.API +'/processos/listaEntregas');
    }

    registraRecebedor(entregaId: number, recebedor: string, dataEntrega:string){
        const dados = {entregaId, recebedor, dataEntrega};
        return this.http.post<Response>(this.API +'/processos/registraRecebedor', dados);
    }
}