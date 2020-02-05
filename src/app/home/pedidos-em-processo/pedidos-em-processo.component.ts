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
  pedidoSelecionado:Pedido;
  clinicas:Clinica[];
  verifCheckEntrega:boolean;
  carregamentoPedidos:boolean = false;
  carregamentoClinicas:boolean = false;
  
  constructor(private pedidosEmProcessoService: PedidosEmProcessoService,
              private modalService: NgbModal ) { }

  ngOnInit() {

    this.pedidosEmProcessoService.listaClinicasPorStatusPedidoEmProcesso()
      .subscribe(res => {
        this.clinicas = res;
        this.carregamentoClinicas = true;
      }, error => {alert("Erro ao acessar o banco de dados")});

    this.pedidosEmProcessoService.listaPedidosPorStatusEmProcesso()
      .subscribe(res =>{
        this.pedidos = res;
        this.pedidos.forEach(pedido => pedido.checkEntrega = false);
        this.carregamentoPedidos = true;
      }, error => {alert("Erro ao acessar o banco de dados")});  

      }
    
    abreModalPedido(content, pedidoId){
        this.pedidos.find(pedido => this.pedidoSelecionado = pedido);
        this.modalService.open(content, { centered: true, size: 'lg',scrollable: true });
       }
    
    checkEntrega(clinicaId:number, pedidoId:number){
     this.verifCheckEntrega = false;
      this.pedidos.forEach(pedido => {
        if(pedido.id == pedidoId){
          pedido.checkEntrega =  $('#checkEntrega_'+pedidoId).prop("checked");
         }
      })

      this.pedidos.forEach(pedido => {
        if((pedido.clinicaId == clinicaId) && (pedido.checkEntrega)){
          this.verifCheckEntrega = true;
        }
      })
          
      if(this.verifCheckEntrega){
        $("#botaoRegistrarEntrega_"+clinicaId).slideDown(350);
      }
      else{
        $("#botaoRegistrarEntrega_"+clinicaId).slideUp(350);
      }
      this.verifCheckEntrega = false;  
    }
      


    }

   


