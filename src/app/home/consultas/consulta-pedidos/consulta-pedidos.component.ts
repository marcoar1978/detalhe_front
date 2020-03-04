import { Component, OnInit, OnChanges } from '@angular/core';
import * as $ from "jquery";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DataService } from 'src/app/service/data.service';
import { Clinica } from 'src/app/model/clinica.model';
import { DadosIniciais } from 'src/app/model/dados-iniciais.model';
import { Pedido } from 'src/app/model/pedido.model';
import { PedidoService } from 'src/app/service/pedido.service';
import { EntregaService } from 'src/app/service/entregas.service';
import { Entrega } from 'src/app/model/entrega.model';
import { Fechamento } from 'src/app/model/fechamento.model';
import { FechamentoService } from 'src/app/service/fechamento.service';

@Component({
  selector: 'app-consulta-pedidos',
  templateUrl: './consulta-pedidos.component.html',
  styleUrls: ['./consulta-pedidos.component.css']
})
export class ConsultaPedidosComponent implements OnInit {

  formExpandido:boolean = false;
  labelButtonForm:string = "Expandir";
  clinicas:Clinica[];
  clinica:Clinica = new Clinica();
  dadosIniciais:DadosIniciais;
  pedidoSelecionado:Pedido = new Pedido();
  pedidos:Pedido[];
  form:FormGroup;
  mgsPedidoId:string;
  modalPedido:any;
  entregaSelecionada:Entrega = new Entrega();
  totalEntregaSelecionada:number;
  situacaoPgto:string;
  fechamentoSelecionado:Fechamento = new Fechamento();
  
  constructor(private dataService: DataService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private pedidoService:PedidoService,
              private entregaService: EntregaService,
              private fechamentoService: FechamentoService) { }

  ngOnInit() {
    this.pedidoSelecionado.entrega = new Entrega();
    this.pedidoSelecionado.entrega.fechamento = new Fechamento();

    this.dataService.clinicaMessage
      .subscribe(res => { 
        this.clinicas = res;
       });
    
    this.dataService.dadosIniciaisMessage
      .subscribe(res => { this.dadosIniciais = res})   
    
  }
 
  expandeFormConsulta() {
        
    if(this.formExpandido == false){
      $("#divFormConsulta").animate({width: "680px"}, 200, "linear", () => {
        $("#divFormConsulta").animate({height: "280px"}, 
        { complete: () => { 
          $("#formConsulta").fadeIn(250); 
          $("#divFormConsulta").css('box-shadow','10px 10px 10px -6px rgba(0,0,0,0.75)');
          $("#pedidoId").focus();
         }})
        }
     );
    }

    if(this.formExpandido == true){
      $("#formConsulta").fadeOut(250, () => {
        $("#divFormConsulta").animate({height: "55px"},  () => {
          $("#divFormConsulta").animate({width: "110px"}, 200, "linear");
          $("#divFormConsulta").css('box-shadow','');
      })  
    });
  }
  
  if(this.formExpandido) {
    this.formExpandido = false;
    this.labelButtonForm = "Expandir";
    }
  else{ 
    this.formExpandido = true;
    this.labelButtonForm = "Reduzir";
  }  
  }

  valueMesAno(){
    console.log($("#mesAno").val());
  }

  consultaPorId(content){
    let pedidoId = $("#pedidoId").val();
    if(!pedidoId){
      alert("Digite o número do pedido");
      return;
    }
    
    $('#divMgsPedidoId').slideUp(350, () => {
      $('#divMgsPedidoId').css('font-weight','normal');
      $('#divMgsPedidoId').css('color','green');
      this.mgsPedidoId = "Aguarde um momento";
      $('#divMgsPedidoId').slideDown(350);
    })
    
    
    this.pedidoService.consultaPorId(pedidoId)
      .subscribe(res => {
        
        $('#divMgsPedidoId').slideUp(350, () => {
          this.mgsPedidoId = ""; 
        });
        this.pedidoSelecionado = res;
        if(this.pedidoSelecionado.entrega.fechamento){
          if((this.pedidoSelecionado.entrega.fechamento.valorTotal - this.pedidoSelecionado.entrega.fechamento.valorPgto) == 0){
              this.situacaoPgto = "Pago";
           }
           else{
            this.situacaoPgto = "Incompleto";
           }
          }
        this.modalService.open(content, { centered: true, size: 'lg',scrollable: true });
      }, error => {
          $('#divMgsPedidoId').slideUp(350, () => {
          this.mgsPedidoId = "";
          if(error.status == 400){
            $('#divMgsPedidoId').css('font-weight','bold');
            $('#divMgsPedidoId').css('color','red');
            this.mgsPedidoId = "Número do pedido não existe";
            $('#divMgsPedidoId').slideDown(350, () => { 
              setTimeout(() => $('#divMgsPedidoId').slideUp(350), 4000); 
             })
             }
           else{
             alert("Problemas para acessar o banco de dados");
           }  
        });
        
      });
  }

  escondeDivConsulta(){
    $("#formConsulta").fadeOut(250, () => {
      $("#divFormConsulta").animate({height: "55px"},  () => {
        $("#divFormConsulta").animate({width: "110px"}, 200, "linear");
        $("#divFormConsulta").css('box-shadow','');
    })  
  });
  }

getEntrega(entregaId:number){
  $("#divAlertEntrega").slideDown(350);

  this.entregaService.getEntrega(entregaId)
    .subscribe(res => {
      this.entregaSelecionada = res;
      this.clinica = this.clinicas.find(clinica => clinica.id == this.entregaSelecionada.clinicaId);
      this.totalEntregaSelecionada= this.entregaSelecionada.pedidos
      .reduce((prevVal, pedido) => {return prevVal + pedido.valorLiquido },0);
           
    setTimeout(() => {
      const janela = window.open('', 'PRINT', 'height=600,width=800');
      janela.document.write('<html><head><title>NotaEntrega'+entregaId+'</title>');
      janela.document.write('</head><body>');  
      janela.document.write(document.getElementById("caixaNotaEntrega").innerHTML);
      janela.document.write('</body></html>');
      $("#divAlertEntrega").slideUp(350);
    },500 )
      }, error => {
      alert("Problema ao acessar o banco de dados")
      $("#divAlertEntrega").slideUp(350);
  
    } )
}

getFechamento(fechamentoId:number){
  $("#divAlertFechamento").slideDown(350);
  
  this.fechamentoService.getFechamento(fechamentoId)
    .subscribe(res => {
      this.fechamentoSelecionado = res;
      this.clinica = this.clinicas.find(clinica => clinica.id == this.fechamentoSelecionado.clinicaId)
      setTimeout(() => {
        const janela = window.open('', 'PRINT', 'height=600,width=800');
        janela.document.write('<html><head><title>NotaEntrega'+fechamentoId+'</title>');
        janela.document.write('</head><body>');  
        janela.document.write(document.getElementById("caixaNotaFechamento").innerHTML);
        janela.document.write('</body></html>');
        $("#divAlertFechamento").slideUp(350);
      },500 )
    }, error => {
      alert("Problema ao acessar o banco de dados")
      $("#divAlertFechamento").slideUp(350);

    })
}

}
