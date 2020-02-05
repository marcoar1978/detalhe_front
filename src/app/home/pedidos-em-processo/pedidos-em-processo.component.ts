import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Pedido } from 'src/app/model/pedido.model';
import { Clinica } from 'src/app/model/clinica.model';
import { PedidosEmProcessoService } from 'src/app/service/pedidosEmProcesso.service';


@Component({
  selector: 'app-pedidos-em-processo',
  templateUrl: './pedidos-em-processo.component.html',
  styleUrls: ['./pedidos-em-processo.component.css']
})
export class PedidosEmProcessoComponent implements OnInit {

  pedidos:Pedido[];
  clinicas:Clinica[];
  carregamentoPedidos:boolean = false;
  carregamentoClinicas:boolean = false;
  
  constructor(private pedidosEmProcessoService: PedidosEmProcessoService,
              private modalService: NgbModal ) { }

  ngOnInit() {

    this.pedidosEmProcessoService.listaClinicasPorStatusPedidoEmProcesso()
      .subscribe(res => {
        this.clinicas = res;
        console.log(this.clinicas);
        this.carregamentoClinicas = true;
      }, error => {alert("Erro ao acessar o banco de dados")});

    this.pedidosEmProcessoService.listaPedidosPorStatusEmProcesso()
      .subscribe(res =>{
        this.pedidos = res;
        console.log(this.pedidos);
        this.carregamentoPedidos = true;
      }, error => {alert("Erro ao acessar o banco de dados")});  

      }
    
    abreModalPedido(content){
        this.modalService.open(content, { centered: true, size: 'lg' });
    }

    }

   


