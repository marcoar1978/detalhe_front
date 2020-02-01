import { Item } from './item.model';

export class Pedido{
    id:number;
    dataPedido:string;
    clinica:string;
    dentista:string;
    nomePaciente:string;
    prazo:number;
    dataEntregaPrevista:string;
    obs:string;
    desconto:number;
    valorTotal:number;
    valorLiquido:number;
    usuario:string;
    protetico:string;
    itensPadrao:Item[] = [];

}