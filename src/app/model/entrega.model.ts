import { Pedido } from './pedido.model';
import { Fechamento } from './fechamento.model';

export class Entrega{
    id:number;
    dataEmissao:string;
    dataEntrega:string;
    clinicaId: number;
    obs: string;
    recebedor:string;
    pedidos:Pedido[];
    pedidosId: number[];
    totalEntrega:number;
    fechamento:Fechamento;

    displayComRecebedor:string;
    displaySemRecebedor:string;
    checkFechamento:boolean = false;




}