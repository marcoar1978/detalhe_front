import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

import { DataService } from 'src/app/service/data.service';
import { EntregaService } from 'src/app/service/entregas.service';
import { DadosIniciais } from 'src/app/model/dados-iniciais.model';
import { Clinica } from 'src/app/model/clinica.model';
import { Entrega } from 'src/app/model/entrega.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-consulta-entregas',
  templateUrl: './consulta-entregas.component.html',
  styleUrls: ['./consulta-entregas.component.css']
})
export class ConsultaEntregasComponent implements OnInit {

  formExpandido:boolean = false;
  labelButtonForm:string = "Expandir";
  dadosIniciais:DadosIniciais;
  anoMes:string;
  mgsEntregaId:string;
  msgClinica:string;
  clinicas:Clinica[];
  clinica:Clinica = new Clinica();
  entregaSelecionada:Entrega = new Entrega();
  entregas:Entrega[] = [];

  constructor(private dataService: DataService,
              private modalService: NgbModal,
              private entregaService: EntregaService,) { }

  ngOnInit() {

    this.dataService.dadosIniciaisMessage
      .subscribe(res => { 
        this.dadosIniciais = res;
        const dataSplit = this.dadosIniciais.dataHoje.split("-");
        this.anoMes = dataSplit[0]+"-"+dataSplit[1];
       });
       
       this.dataService.clinicaMessage
      .subscribe(res => { 
        this.clinicas = res;
       });
  }


  expandeFormConsulta() {
    $("#buttonExpandeFormConsulta").prop("disabled", true);    
    if(this.formExpandido == false){
      $("#divFormConsulta").animate({width: "680px"}, 200, "linear", () => {
        $("#divFormConsulta").animate({height: "280px"}, 
        { complete: () => { 
          $("#formConsulta").fadeIn(250); 
          $("#divFormConsulta").css('box-shadow','10px 10px 10px -6px rgba(0,0,0,0.75)');
         
          $("#buttonExpandeFormConsulta").prop("disabled", false); 
         }})
        }
     );
    }

    if(this.formExpandido == true){
      $("#formConsulta").fadeOut(250, () => {
        $("#divFormConsulta").animate({height: "55px"},  () => {
          $("#divFormConsulta").animate({width: "110px"}, 200, "linear");
          $("#divFormConsulta").css('box-shadow','');
          $("#buttonExpandeFormConsulta").prop("disabled", false); 
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
  
  consultaPorEntregaId(){
    let entregaId = $("#entregaId").val();
    

    if(!entregaId){
      alert("Digite o número da entrega");
      return;
    }

    $('#divMgsEntregaId').slideUp(350, () => {
      $('#divMgsEntregaId').css('font-weight','normal');
      $('#divMgsEntregaId').css('color','green');
      this.mgsEntregaId = "Aguarde um momento";
      $('#divMgsEntregaId').slideDown(350);
    });

    this.entregaService.getEntrega(entregaId)
      .subscribe(res => {
        $('#divMgsEntregaId').slideUp(350, () => {
          this.mgsEntregaId = ""; 
        });

        this.entregaSelecionada = res;
        this.clinica = this.clinicas.find(clinica => clinica.id == this.entregaSelecionada.clinicaId);

        setTimeout(() => {
          const janela = window.open('', 'PRINT', 'height=600,width=800');
          janela.document.write('<html><head><title>NotaEntrega'+entregaId+'</title>');
          janela.document.write('</head><body>');  
          janela.document.write(document.getElementById("caixaNotaEntrega").innerHTML);
          janela.document.write('</body></html>');
          
        },500 );
       
      }, error => {
        $('#divMgsEntregaId').slideUp(350, () => {
          this.mgsEntregaId = "";
          if(error.status == 400){
            $('#divMgsEntregaId').css('font-weight','bold');
            $('#divMgsEntregaId').css('color','red');
            this.mgsEntregaId = "Número do pedido não existe";
            $('#divMgsEntregaId').slideDown(350, () => { 
              setTimeout(() => $('#divMgsEntregaId').slideUp(350), 4000); 
             })
             }
           else{
            $('#divMgsEntregaId').slideUp(350);
             alert("Problemas para acessar o banco de dados");
           }  
        });
      })
  }

  consultaPorClinica(){
    const clinicaId = $("#clinicaId").val();
    const data = $("#anoMes").val();
    const dataSplit = data.split("-");
    const ano = dataSplit[0];
    const mes = dataSplit[1];

    if(!clinicaId){
      alert("Selecione a clínica");
      return;
    }

    $('#divMsgClinica').slideUp(350, () => {
      $('#divMsgClinica').css('font-weight','normal');
      $('#divMsgClinica').css('color','green');
      this.msgClinica = "Aguarde um momento";
      $('#divMsgClinica').slideDown(350);
    });

    this.entregaService.consultaEntregaPorClinica(clinicaId, ano, mes)
      .subscribe(res => {
        this.entregas = res;
    if(this.entregas.length == 0){
      
     $('#divMsgClinica').slideUp(350, () => {
       $('#divMsgClinica').css('font-weight','bold');
       $('#divMsgClinica').css('color','red');
       this.msgClinica = "Não há registros neste período";
       $('#divMsgClinica').slideDown(350, () => {
         setTimeout( () => { $('#divMsgClinica').slideUp(350);}, 4000);
       });
     });
     return;
    }

    this.entregas.forEach(entrega => {
      entrega.clinica = this.clinicas.find(clinica => clinica.id == entrega.clinicaId);
    });

    $('#divMsgClinica').slideUp(350, () => {
      $("#formConsulta").fadeOut(250, () => {
        $("#divFormConsulta").animate({height: "55px"},  () => {
          $("#divFormConsulta").animate({width: "110px"}, 200, "linear");
          $("#divFormConsulta").css('box-shadow','');
          this.msgClinica = "";
          $("#tabelaEntregas").fadeOut(350, () => {
            $("#tabelaEntregas").fadeIn(350);
          })

      })  
    });

    });
   
      }, error => {
        $('#divMsgClinica').slideUp(350);
        alert("Problemas para acessar o banco de dados");
      })
   }
  
abreModalEntrega(entregaId:number){
  $(`#msgDetalheEntrega_${entregaId}`).fadeIn(250);
  this.entregaService.getEntrega(entregaId)
  .subscribe(res => {
    $(`#msgDetalheEntrega_${entregaId}`).fadeOut(250);
    this.entregaSelecionada = res;
    this.clinica = this.clinicas.find(clinica => clinica.id == this.entregaSelecionada.clinicaId);

    setTimeout(() => {
      const janela = window.open('', 'PRINT', 'height=600,width=800');
      janela.document.write('<html><head><title>NotaEntrega'+entregaId+'</title>');
      janela.document.write('</head><body>');  
      janela.document.write(document.getElementById("caixaNotaEntrega").innerHTML);
      janela.document.write('</body></html>');
      
    },500 );
   
  }, error => { 
    $(`#msgDetalheEntrega_${entregaId}`).fadeOut(250, () => {
      alert("Problemas para acessar o banco de dados"); });
    });
    
  

}  

}
