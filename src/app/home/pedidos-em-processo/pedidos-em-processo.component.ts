import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

import { Pedido } from 'src/app/model/pedido.model';
import { Clinica } from 'src/app/model/clinica.model';
import { PedidosEmProcessoService } from 'src/app/service/pedidosEmProcesso.service';
import { Entrega } from 'src/app/model/entrega.model';
import { DadosIniciais } from 'src/app/model/dados-iniciais.model';



@Component({
  selector: 'app-pedidos-em-processo',
  templateUrl: './pedidos-em-processo.component.html',
  styleUrls: ['./pedidos-em-processo.component.css']
})
export class PedidosEmProcessoComponent implements OnInit {

  pedidos:Pedido[];
  pedidosCheckados:Pedido[];
  pedidoSelecionado:Pedido;
  totalPedidosSelecionados:number;
  clinicas:Clinica[];
  clinica:Clinica;
  verifCheckEntrega:boolean;
  carregamentoPedidos:boolean = false;
  carregamentoClinicas:boolean = false;
  dataEntrega:string;
  obs:string;
  labelConfEntrega:string = "Confirmar Entrega";
  disabledConfEntrega:boolean = false;
  modalConferencia:any;
  dadosIniciais:DadosIniciais;
  
  constructor(private pedidosEmProcessoService: PedidosEmProcessoService,
              private modalService: NgbModal,
              private router: Router,
              private dataService: DataService ) { }

  ngOnInit() {

    this.pedidosEmProcessoService.listaClinicasPorStatusPedidoEmProcesso()
      .subscribe(res => {
        this.clinicas = res;
        this.carregamentoClinicas = true;
        this.escondeAlert(this.carregamentoClinicas,this.carregamentoPedidos);
      }, error => {alert("Erro ao acessar o banco de dados")});

    this.pedidosEmProcessoService.listaPedidosPorStatusEmProcesso()
      .subscribe(res =>{
        this.pedidos = res;
        this.pedidos.forEach(pedido => pedido.checkEntrega = false);
        this.carregamentoPedidos = true;
        this.escondeAlert(this.carregamentoClinicas,this.carregamentoPedidos);
      }, error => {alert("Erro ao acessar o banco de dados")});  


      this.dataService.dadosIniciaisSubject.subscribe(res => {
       this.dadosIniciais = res});
      
      }

    escondeAlert(carregamentoClinicas:boolean,carregamentoPedidos:boolean ){
      
      if((carregamentoClinicas) && (carregamentoPedidos)){
        $("#divAguardarDados").slideUp(350);
      }
    }  
    
    abreModalPedido(content, pedidoId){
        this.pedidoSelecionado = this.pedidos.find(pedido => pedido.id == pedidoId);
        this.modalService.open(content, { centered: true, size: 'lg',scrollable: true });
       }
    
    checkEntrega(clinicaId:number, pedidoId:number){
     
     this.dataEntrega = this.dadosIniciais.dataHoje; 
     this.obs = ""; 
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

    conferirEntrega(clinicaId:number, conferenciaEntrega){
      this.pedidosCheckados = this.pedidos.filter(pedido => (pedido.checkEntrega == true && pedido.clinicaId == clinicaId));

      this.clinica = this.clinicas.find(clinica => clinica.id == clinicaId);
      this.modalConferencia = this.modalService.open(conferenciaEntrega, { centered: true, size: 'lg',scrollable: true });
      }

  confirmarEntrega(clinicaId:number){
      this.labelConfEntrega = "Aguarde um momento";
      this.disabledConfEntrega = true;
      let pedidosId: number[] =[];
      this.pedidosCheckados.forEach(pedidoCheckados => pedidosId.push(pedidoCheckados.id));
      
      let entrega:Entrega = new Entrega();
      entrega.clinicaId = clinicaId;
      entrega.obs = this.obs;
      entrega.pedidosId = pedidosId;
      entrega.totalEntrega = this.pedidosCheckados
              .reduce((prevVal, pedidoCheckado) => {return prevVal + pedidoCheckado.valorLiquido },0);

      
      this.dataService.altDataPedidosAEntregar(this.pedidosCheckados);

      this.pedidosEmProcessoService.emiteEntrega(entrega)
        .subscribe(res => {
          entrega.id = res;
          const params = {nomeClinica: this.clinica.nomeSimp, dataEntrega: this.dataEntrega, obs: this.obs, entregaId: entrega.id, totalEntrega: entrega.totalEntrega };
          this.modalConferencia.close();
           this.router.navigate(['home/confirmaEntregaPedido'], {queryParams:params })
           
        }, error => {
          this.labelConfEntrega = "Confirmar Entrega";
          this.disabledConfEntrega = false;
          alert("Erro ao acessar o banco de dados");})
      
    }
    
   


   }



   


