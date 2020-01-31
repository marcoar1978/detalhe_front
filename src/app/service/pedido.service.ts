import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Clinica } from '../model/clinica.model';
import { Dentista } from '../model/dentista.model';
import { Protetico } from '../model/protetico.model';
import { Produto } from '../model/produto.model';
import { AbrirPedido } from '../model/abrirPedido.model';
import { ItemPadrao } from '../model/itemPadrao.model';

@Injectable({providedIn: 'root'})
export class PedidoService{
    API:string = "http://ec2-54-82-227-244.compute-1.amazonaws.com";
    clinicas:Clinica[];
    proteticos:Protetico[];
    

    constructor(private http: HttpClient){}

    abrirPedido(): Observable<AbrirPedido>{
        return this.http.get<AbrirPedido>(this.API +'/pedido/abrirPedido');
    }

    addItemPadrao(itemPadrao: ItemPadrao ):Observable<Response>{
        return this.http.post<Response>(this.API +'/item/addItemPadrao', itemPadrao );
    }

    delItemPadrao(pedidoId:number, produtoId: number):Observable<Response>{
        let httpParams:HttpParams = new HttpParams()
            .set("pedidoIdForm", pedidoId.toString())
            .set("produtoIdForm", produtoId.toString());
        return this.http.get<Response>(this.API +'/item/delItemPadrao?'+httpParams.toString());
    }

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

   altProtetico(pedidoId:number, proteticoId:number): Observable<Response>{
        let httpParams:HttpParams = new HttpParams()
          .set("pedidoIdForm", pedidoId.toString())
          .set("proteticoIdForm", proteticoId.toString());
        return this.http.get<Response>(this.API +'/pedido/altProtetico?'+httpParams.toString());  
   }

   altDesconto(pedidoId:number,desconto:number):Observable<Response>{
    let httpParams:HttpParams = new HttpParams()
    .set("pedidoIdForm", pedidoId.toString())
    .set("descontoForm", desconto.toString());
    return this.http.get<Response>(this.API +'/pedido/altDesconto?'+httpParams.toString());  
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

   altObs(pedidoId:number, obs:string):Observable<Response>{
    return this.http.post<Response>(this.API +'/pedido/altObs', {pedidoId, obs});
   }
   
   
    
}