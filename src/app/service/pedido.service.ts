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
import { API } from '../../environments/api';

@Injectable({ providedIn: 'root' })
export class PedidoService {

    clinicas: Clinica[];
    proteticos: Protetico[];

    constructor(private http: HttpClient) { }

    getDataEUsuario(): Observable<DadosIniciais> {
        return this.http.get<DadosIniciais>(API + '/dadosIniciais/dataEUsuario');
    }

    abrirPedido(): Observable<AbrirPedido> {
        return this.http.get<AbrirPedido>(API + '/pedido/abrirPedido');
    }

    addItem(item: Item): Observable<Response> {
        return this.http.post<Response>(API + '/item/addItem', item);
    }

    delItem(uuid: string): Observable<Response> {
        let httpParams: HttpParams = new HttpParams()
            .set("uuid", uuid);
        return this.http.get<Response>(API + '/item/delItem?' + httpParams.toString());
    }


    addItemPadrao(itemPadrao: ItemPadrao): Observable<Response> {
        return this.http.post<Response>(API + '/item/addItemPadrao', itemPadrao);
    }

    addItemVariavel(itemVariavel: ItemVariavel): Observable<Response> {
        return this.http.post<Response>(API + '/item/addItemVariavel', itemVariavel);
    }

    delItemPadrao(pedidoId: number, produtoId: number): Observable<Response> {
        let httpParams: HttpParams = new HttpParams()
            .set("pedidoIdForm", pedidoId.toString())
            .set("produtoIdForm", produtoId.toString());
        return this.http.get<Response>(API + '/item/delItemPadrao?' + httpParams.toString());
    }

    delItemVariavel(pedidoId: number, ordem: number): Observable<Response> {
        let httpParams: HttpParams = new HttpParams()
            .set("pedidoIdForm", pedidoId.toString())
            .set("ordemForm", ordem.toString());
        return this.http.get<Response>(API + '/item/delItemVariavel?' + httpParams.toString());
    }

    altDataPedido(pedidoId: number, dataPedido: string, prazo: number): Observable<Response> {
        let httpParams: HttpParams = new HttpParams()
            .set("pedidoIdForm", pedidoId.toString())
            .set("dataPedidoForm", dataPedido)
            .set("prazoForm", prazo.toString());
        return this.http.get<Response>(API + '/pedido/altDataPedido?' + httpParams.toString());
    }



    getClinicas(): Observable<Clinica[]> {
        return this.http.get<Clinica[]>(API + '/clinicas');
    }

    getProteticos(): Observable<Protetico[]> {
        return this.http.get<Protetico[]>(API + '/proteticos');
    }

    getProdutos(): Observable<Produto[]> {
        return this.http.get<Produto[]>(API + '/produto/listaProdutoClinica');
    }

    detPrecos(): Observable<Produto[]> {
        return this.http.get<Produto[]>(API + '/produto/detPrecos');
    }

    getDentistas(): Observable<Dentista[]> {
        return this.http.get<Dentista[]>(API + '/dentista');
    }

    delPedidoEmAberto(): Observable<Response> {
        return this.http.get<Response>(API + "/pedido/delPedidoEmAberto");
    }

    altClinica(pedidoId: number, clinicaId: number): Observable<Dentista[]> {
        let httpParams: HttpParams = new HttpParams()
            .set("pedidoIdForm", pedidoId.toString())
            .set("clinicaIdForm", clinicaId.toString());
        return this.http.get<Dentista[]>(API + '/pedido/altClinica?' + httpParams.toString());
    }

    altProtetico(pedidoId: number, proteticoId: number): Observable<Response> {
        let httpParams: HttpParams = new HttpParams()
            .set("pedidoIdForm", pedidoId.toString())
            .set("proteticoIdForm", proteticoId.toString());
        return this.http.get<Response>(API + '/pedido/altProtetico?' + httpParams.toString());
    }

    altDesconto(pedidoId: number, desconto: number): Observable<Response> {
        let httpParams: HttpParams = new HttpParams()
            .set("pedidoIdForm", pedidoId.toString())
            .set("descontoForm", desconto.toString());
        return this.http.get<Response>(API + '/pedido/altDesconto?' + httpParams.toString());
    }

    altDentista(pedidoId: number, dentistaId: number): Observable<Response> {
        let httpParams: HttpParams = new HttpParams()
            .set("pedidoIdForm", pedidoId.toString())
            .set("dentistaIdForm", dentistaId.toString());
        return this.http.get<Response>(API + '/pedido/altDentista?' + httpParams.toString());
    }

    altNomePaciente(pedidoId: number, nomePaciente: string): Observable<Response> {
        let httpParams: HttpParams = new HttpParams()
            .set("pedidoIdForm", pedidoId.toString())
            .set("nomePaciente", nomePaciente);
        return this.http.get<Response>(API + '/pedido/altNomePaciente?' + httpParams.toString());
    }

    altObs(pedidoId: number, obs: string): Observable<Response> {
        return this.http.post<Response>(API + '/pedido/altObs', { pedidoId, obs });
    }


    fecharPedido(pedidoId: number): Observable<Response> {
        let httpParams: HttpParams = new HttpParams()
            .set("pedidoIdForm", pedidoId.toString());
        return this.http.get<Response>(API + '/pedido/fecharPedido?' + httpParams.toString());
    }

    conferirPedido(pedidoFechado: PedidoFechado): Observable<Pedido> {
        return this.http.post<Pedido>(API + '/pedido/conferirPedido', pedidoFechado);
    }

    delItensPorProduto(pedidoId: number): Observable<Response> {
        let httpParams: HttpParams = new HttpParams()
            .set("pedidoIdForm", pedidoId.toString());
        return this.http.get<Response>(API + '/pedido/delItensPorProduto?' + httpParams.toString());
    }

    consultaPorId(pedidoId: number): Observable<Pedido> {
        return this.http.get<Pedido>(API + "/pedido/consultaPorId/" + pedidoId);
    }

    consultaPorPaciente(nomePaciente: string): Observable<Pedido[]> {
        let httpParams: HttpParams = new HttpParams()
            .set("nomePaciente", nomePaciente);
        return this.http.get<Pedido[]>(API + "/pedido/consultaPorPaciente?" + httpParams.toString());
    }

    consultaPorClinica(clinicaId: number, ano: string, mes: string): Observable<Pedido[]> {
        let httpParams: HttpParams = new HttpParams()
            .set("clinicaIdForm", clinicaId.toString())
            .set("anoForm", ano)
            .set("mesForm", mes);
        return this.http.get<Pedido[]>(API + "/pedido/consultaPorClinica?" + httpParams.toString());

    }

    altDescItem(uuid: string, desconto: number) {
        let httpParams: HttpParams = new HttpParams()
            .set("uuid", uuid)
            .set("desconto", desconto.toString());
        return this.http.get<Response>(API + "/item/altDescItem?" + httpParams.toString());
    }

    cancelarPedido(pedidoId: number) {
        let httpParams = new HttpParams()
            .set('pedidoIdForm', pedidoId.toString());
        return this.http.get<Response>(API + "/pedido/cancelarPedido?" + httpParams.toString());
    }




}