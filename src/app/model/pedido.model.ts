import { Item } from './item.model';

export class Pedido{
    
    id:number;
    dataPedido:string;
    clinica:string;
    clinicaId:number;
    dentista:string;
    nomePaciente:string;
    prazo:number;
    dataEntregaPrevista:string;
    dataEntrega: string;
    obs:string;
    desconto:number;
    valorTotal:number;
    valorLiquido:number;
    usuario:string;
    protetico:string;
    itensPadrao:Item[] = [];
    statusPedido:string;
    statusEntrega:string;
    checkEntrega:boolean;
    

}