import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Entrega } from '../model/entrega.model';
import { Fechamento } from '../model/fechamento.model';
import { API } from '../../environments/api';

@Injectable({providedIn: 'root'})
export class EntregaService{

    constructor(private http: HttpClient){}

    listaEntregas(){
        return this.http.get<Entrega[]>(API +'/processos/listaEntregas');
    }

    registraRecebedor(entregaId: number, recebedor: string, dataEntrega:string){
        const dados = {entregaId, recebedor, dataEntrega};
        return this.http.post<Response>(API +'/processos/registraRecebedor', dados);
    }

    registrarFechamento(fechamento:Fechamento){
        return this.http.post<Response>(API + '/processos/registrarFechamento', fechamento);
    }

    getEntrega(entregaId:number){
        return this.http.get<Entrega>(API+"/processos/getEntrega/"+entregaId.toString());

    }
}