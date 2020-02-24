import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

import { PedidosEmProcessoService } from 'src/app/service/pedidosEmProcesso.service';
import { Pedido } from 'src/app/model/pedido.model';
import { Entrega } from 'src/app/model/entrega.model';
import { EntregaService } from 'src/app/service/entregas.service';
import { FechamentoService } from 'src/app/service/fechamento.service';
import { Fechamento } from 'src/app/model/fechamento.model';

@Component({
  selector: 'app-status-pedidos',
  templateUrl: './status-pedidos.component.html',
  styleUrls: ['./status-pedidos.component.css']
})
export class StatusPedidosComponent implements OnInit {
 
 pedidos:Pedido[] = [];
 entregas:Entrega[] = []; 
 fechamentos:Fechamento[] =[];
 verifCarregamento:boolean[] =  [false, false, false];
 valorPedidosAbertos:number = 0;
 qdePedidosAbertos:number;
 valorPedidosConcluidos:number = 0;
 qdePedidosConcluidos:number;
 qdeEntregas:number;
 valorPedidosFechados:number;
 qdePedidosFechados:number = 0;
 qdeEntregasFechadas:number;
 qdeFechamentos:number;
 qdeTotalPedidos:number;
 qdeTotalEntregas:number;
 valorTotal;
 

 constructor(private pedidosEmProcessoService: PedidosEmProcessoService,
             private entregaService: EntregaService,
             private fechamentoService: FechamentoService,
              ) { }

  ngOnInit() {
    this.pedidosEmProcessoService.listaPedidosPorStatusEmProcesso()
    .subscribe(res =>{
      this.pedidos = res;
      this.verifCarregamento[0] = true;
      this.escondeAlert();
    }, error => {alert("Erro ao acessar o banco de dados")});  

    this.entregaService.listaEntregas()
        .subscribe(res => {
          this.entregas = res;
          this.verifCarregamento[1] = true;
          this.escondeAlert();
        }, error => {alert("Erro ao acessar o banco de dados")}); 
    
    this.fechamentoService.listaFechamentos()
      .subscribe(res => {
        this.fechamentos = res;
        this.verifCarregamento[2] = true;
        this.escondeAlert();
      }, error => {alert("Erro ao acessar o banco de dados")});  
        
    
  }

  escondeAlert(){
    if(!this.verifCarregamento.includes(false)){
        $("#divAguardarDados").fadeOut(500, () => {
        this.valorPedidosAbertos = this.pedidos.reduce((prevVal, pedido) => {return prevVal + pedido.valorLiquido },0);  
        this.qdePedidosAbertos = this.pedidos.length;
       
        this.valorPedidosConcluidos = this.entregas.reduce((prevVal, entrega) => {return prevVal + entrega.totalEntrega}, 0);
        this.qdePedidosConcluidos = this.entregas.reduce((prevVal, entrega) => {return prevVal + entrega.pedidos.length}, 0);
        this.qdeEntregas = this.entregas.length;

        this.valorPedidosFechados = this.fechamentos.reduce((prevVal, fechamento) => {return prevVal + fechamento.valorTotal},0);
        this.fechamentos.forEach(fechamento => {
           fechamento.entregas.forEach(entrega => {
             this.qdePedidosFechados = entrega.pedidos.length + this.qdePedidosFechados;
           })
        });
        this.qdeEntregasFechadas = this.fechamentos.reduce((prevVal, fechamento) => { return prevVal + fechamento.entregas.length}, 0);
        this.qdeFechamentos = this.fechamentos.length;

        this.qdeTotalPedidos = this.qdePedidosAbertos + this.qdePedidosConcluidos + this.qdePedidosFechados;
        this.qdeTotalEntregas = this.qdeEntregas + this.qdeEntregasFechadas;
        this.valorTotal = this.valorPedidosAbertos + this.valorPedidosConcluidos + this.qdeEntregasFechadas;




          $("#tabelaStatus").fadeIn(500);
        });
    }
  }

  imprimirPedidos(){
    const janela = window.open('', 'PRINT', 'height=500,width=700');
    janela.document.write('<html><head><title>Pedidos</title>');
    janela.document.write('</head><body>');  
    janela.document.write(document.getElementById("impressaoPedidos").innerHTML);
    janela.document.write('</body></html>');
    //janela.print();
    //janela.close();

  }

 }
