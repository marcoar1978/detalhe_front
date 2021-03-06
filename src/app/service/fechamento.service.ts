import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fechamento } from '../model/fechamento.model';
import { Pgto } from '../model/pgto.model';
import { Observable } from 'rxjs';

import { API } from '../../environments/api';


@Injectable({ providedIn: 'root' })
export class FechamentoService {

    constructor(private http: HttpClient) { }

    listaFechamentos() {

        return this.http.get<Fechamento[]>(API + '/fechamento/lista');
    }

    addPgto(pgto: Pgto): Observable<Response> {

        return this.http.post<Response>(API + '/fechamento/addPgto', pgto);
    }

    getFechamento(fechamentoId: number) {
        return this.http.get<Fechamento>(API + "/fechamento/" + fechamentoId.toString());
    }

    consultaPorClinica(clinicaId: number, ano: string, mes: string) {
        let httpParams: HttpParams = new HttpParams()
            .set("clinicaIdForm", clinicaId.toString())
            .set("anoForm", ano)
            .set("mesForm", mes);
        return this.http.get<Fechamento[]>(API + "/fechamento/consultaPorClinica?" + httpParams.toString());
    }

    addDesconto(fechamentoId: number, desconto: number): Observable<Response> {
        let httpParams: HttpParams = new HttpParams()
            .set("fechamentoId", fechamentoId.toString())
            .set("desconto", desconto.toString());
        return this.http.get<Response>(API + '/fechamento/addDesconto?' + httpParams.toString());
    }

}


