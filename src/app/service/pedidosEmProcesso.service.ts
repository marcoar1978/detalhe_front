import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Pedido } from '../model/pedido.model';
import { Clinica } from '../model/clinica.model';
import { Entrega } from '../model/entrega.model';
import { API } from '../../environments/api';

@Injectable({providedIn: 'root'})
export class PedidosEmProcessoService{
    

    constructor(private http: HttpClient){}

    listaClinicasPorStatusPedidoEmProcesso(): Observable<Clinica[]>{
        return this.http.get<Clinica[]>(API +'/processos/listaClinicasPorStatusPedidoEmProcesso');
    }

    listaPedidosPorStatusEmProcesso(): Observable<Pedido[]>{
        return this.http.get<Pedido[]>(API +'/processos/listaPedidosPorStatusEmProcesso');
    }

    emiteEntrega(entrega: Entrega): Observable<number>{
        return this.http.post<number>(API +'/processos/emiteEntrega', entrega );
    }


}