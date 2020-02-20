import { Entrega } from './entrega.model';

export class Fechamento{
    id:number;
    clinicaId:number;
    dataFechamento:string;
    valorTotal:number;
    valorPgto:number;
    obs:string;
    
    entregas:Entrega[];
    entregasId:number[];

}