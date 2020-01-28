import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Clinica } from '../model/clinica.model';
import { Dentista } from '../model/dentista.model';
import { Protetico } from '../model/protetico.model';
import { Produto } from '../model/produto.model';

@Injectable({providedIn: 'root'})
export class PedidoService{
    API:string = "http://ec2-54-82-227-244.compute-1.amazonaws.com";
    clinicas:Clinica[];
    proteticos:Protetico[];
    

    constructor(private http: HttpClient){}

    getClinicas(): Observable<Clinica[]>{
        return this.http.get<Clinica[]>(this.API +'/clinicas');
    }

    getProteticos(): Observable<Protetico[]>{
        return this.http.get<Protetico[]>(this.API +'/proteticos');
    }

    getProdutos(): Observable<Produto[]>{
        return this.http.get<Produto[]>(this.API +'/produto/listaProdutoClinica');
    }

    getDentistas(): Observable<Dentista[]>{
        return this.http.get<Dentista[]>(this.API +'/dentista');
    } 

    altClinica(pedidoId:number,clinicaId:number): Observable<Dentista[]>{
        let httpParams:HttpParams = new HttpParams()
            .set("pedidoIdForm", pedidoId.toString())
            .set("clinicaIdForm", clinicaId.toString());
        return this.http.get<Dentista[]>(this.API +'/pedido/altClinica?'+httpParams.toString());
        }
    
   altDentista(pedidoId:number, dentistaId:number): Observable<Response>{
    let httpParams:HttpParams = new HttpParams()
        .set("pedidoIdForm", pedidoId.toString())
        .set("dentistaIdForm", dentistaId.toString());
        return this.http.get<Response>(this.API +'/pedido/altDentista?'+httpParams.toString());
   }

   altNomePaciente(pedidoId:number, nomePaciente:string):Observable<Response>{
    let httpParams:HttpParams = new HttpParams()
        .set("pedidoIdForm", pedidoId.toString())
        .set("nomePaciente", nomePaciente);
        return this.http.get<Response>(this.API +'/pedido/altNomePaciente?'+httpParams.toString());
   }     
    
}