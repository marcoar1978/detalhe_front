import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { Pedido } from '../model/pedido.model';
import { Clinica } from '../model/clinica.model';
import { Entrega } from '../model/entrega.model';

@Injectable({providedIn: 'root'})
export class PedidosEmProcessoService{
    API:string = "http://ec2-54-82-227-244.compute-1.amazonaws.com";
    //API:string = "http://localhost:8080";

    constructor(private http: HttpClient){}

    listaClinicasPorStatusPedidoEmProcesso(): Observable<Clinica[]>{
        return this.http.get<Clinica[]>(this.API +'/processos/listaClinicasPorStatusPedidoEmProcesso');
    }

    listaPedidosPorStatusEmProcesso(): Observable<Pedido[]>{
        return this.http.get<Pedido[]>(this.API +'/processos/listaPedidosPorStatusEmProcesso');
    }

    emiteEntrega(entrega: Entrega): Observable<number>{
        return this.http.post<number>(this.API +'/processos/emiteEntrega', entrega );
    }


}