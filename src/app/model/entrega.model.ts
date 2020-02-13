import { Pedido } from './pedido.model';

export class Entrega{
    id:number;
    dataEntrega:string;
    clinicaId: number;
    obs: string;
    recebedor:string;
    pedidos:Pedido[];
    pedidosId: number[];
    totalEntrega:number;



}