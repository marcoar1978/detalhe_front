import { Entrega } from './entrega.model';
import { Pgto } from './pgto.model';
import { Clinica } from './clinica.model';

export class Fechamento{
    id:number;
    clinicaId:number;
    dataFechamento:string;
    valorTotal:number;
    valorPgto:number;
    obs:string;
    
    entregas:Entrega[];
    entregasId:number[];
    pgtos:Pgto[];

    clinica:Clinica;

}