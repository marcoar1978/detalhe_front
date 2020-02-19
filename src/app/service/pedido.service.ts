import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Clinica } from '../model/clinica.model';
import { PedidoFechado } from '../model/pedido-fechado.model';
import { Dentista } from '../model/dentista.model';
import { Protetico } from '../model/protetico.model';
import { Produto } from '../model/produto.model';
import { AbrirPedido } from '../model/abrirPedido.model';
import { ItemPadrao } from '../model/itemPadrao.model';
import { Pedido } from '../model/pedido.model';
import { ItemVariavel } from '../model/itemVariavel.model';
import { Item } from '../model/item.model';
import { DadosIniciais } from '../model/dados-iniciais.model';

@Injectable({providedIn: 'root'})
export class PedidoService{
    //API:string = "http://ec2-54-82-227-244.compute-1.amazonaws.com";
    API:string = "http://localhost:8080";
    clinicas:Clinica[];
    proteticos:Protetico[];
    
    constructor(private http: HttpClient){}

    getDataEUsuario():Observable<DadosIniciais>{
        return this.http.get<DadosIniciais>(this.API +'/dadosIniciais/dataEUsuario');
    }

    abrirPedido(): Observable<AbrirPedido>{
        return this.http.get<AbrirPedido>(this.API +'/pedido/abrirPedido');
    }

    addItem(item: Item ):Observable<Response>{
        return this.http.post<Response>(this.API +'/item/addItem', item );
    }

    delItem(pedidoId:number, ordem: number):Observable<Response>{
        let httpParams:HttpParams = new HttpParams()
            .set("pedidoIdForm", pedidoId.toString())
            .set("ordemForm", ordem.toString());
        return this.http.get<Response>(this.API +'/item/delItem?'+httpParams.toString());
    }


    addItemPadrao(itemPadrao: ItemPadrao ):Observable<Response>{
        return this.http.post<Response>(this.API +'/item/addItemPadrao', itemPadrao );
    }

    addItemVariavel(itemVariavel: ItemVariavel):Observable<Response>{
        return this.http.post<Response>(this.API +'/item/addItemVariavel', itemVariavel );
    }

    delItemPadrao(pedidoId:number, produtoId: number):Observable<Response>{
        let httpParams:HttpParams = new HttpParams()
            .set("pedidoIdForm", pedidoId.toString())
            .set("produtoIdForm", produtoId.toString());
        return this.http.get<Response>(this.API +'/item/delItemPadrao?'+httpParams.toString());
    }

    delItemVariavel(pedidoId:number, ordem: number):Observable<Response>{
        let httpParams:HttpParams = new HttpParams()
            .set("pedidoIdForm", pedidoId.toString())
            .set("ordemForm", ordem.toString());
        return this.http.get<Response>(this.API +'/item/delItemVariavel?'+httpParams.toString());
    }

    altDataPedido(pedidoId:number, dataPedido: string, prazo: number):Observable<Response>{
        let httpParams:HttpParams = new HttpParams()
            .set("pedidoIdForm", pedidoId.toString())
            .set("dataPedidoForm", dataPedido)
            .set("prazoForm", prazo.toString());
        return this.http.get<Response>(this.API +'/pedido/altDataPedido?'+httpParams.toString());
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

  
   fecharPedido(pedidoId:number):Observable<Response>{
    let httpParams:HttpParams = new HttpParams()
        .set("pedidoIdForm", pedidoId.toString());
    return this.http.get<Response>(this.API +'/pedido/fecharPedido?'+httpParams.toString());
   }
   
   conferirPedido( pedidoFechado:PedidoFechado):Observable<Pedido>{
        return this.http.post<Pedido>(this.API +'/pedido/conferirPedido',pedidoFechado );
   }

   delItensPorProduto(pedidoId:number):Observable<Response>{
    let httpParams:HttpParams = new HttpParams()
        .set("pedidoIdForm", pedidoId.toString());
    return this.http.get<Response>(this.API +'/pedido/delItensPorProduto?'+httpParams.toString());
   }
  

   
   
    
}