import { Entrega } from './entrega.model';

export class Fechamento{
    id:number;
    clinicaId:number;
    dataFechamento:string;
    valor:number;
    valorPagamento:number;
    obs:string;
    
    entregas:Entrega[];
    entregasId:number[];

}