import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from "jquery";

import { DadosIniciais } from 'src/app/model/dados-iniciais.model';
import { Clinica } from 'src/app/model/clinica.model';
import { DataService } from 'src/app/service/data.service';
import { FechamentoService } from 'src/app/service/fechamento.service';
import { Fechamento } from 'src/app/model/fechamento.model';

@Component({
  selector: 'app-consulta-fechamentos',
  templateUrl: './consulta-fechamentos.component.html',
  styleUrls: ['./consulta-fechamentos.component.css']
})
export class ConsultaFechamentosComponent implements OnInit {

  formExpandido:boolean = false;
  labelButtonForm:string = "Expandir";
  dadosIniciais:DadosIniciais;
  anoMes:string;
  mgsFechamentoId:string;
  msgClinica:string;
  clinicas:Clinica[];
  clinica:Clinica = new Clinica();
  fechamentoSelecionado:Fechamento = new Fechamento();
  
  constructor(private dataService: DataService,
              private modalService: NgbModal,
              private fechamentoService: FechamentoService) { }

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


consultaPorFechamentoId(){
  const fechamentoId = $("#fechamentoId").val();

  if(!fechamentoId){
    alert("Digite o número da entrega");
    return;
  }

  $('#divMgsFechamentoId').slideUp(350, () => {
    $('#divMgsFechamentoId').css('font-weight','normal');
    $('#divMgsFechamentoId').css('color','green');
    this.mgsFechamentoId = "Aguarde um momento";
    $('#divMgsFechamentoId').slideDown(350);
  });

  this.fechamentoService.getFechamento(fechamentoId)
    .subscribe(res => {
      $('#divMgsFechamentoId').slideUp(350, () => {
        this.mgsFechamentoId = ""; 
      });

      this.fechamentoSelecionado = res;
      this.clinica = this.clinicas.find(clinica => clinica.id == this.fechamentoSelecionado.clinicaId);

      setTimeout(() => {
        const janela = window.open('', 'PRINT', 'height=600,width=800');
        janela.document.write('<html><head><title>NotaFechamento'+fechamentoId+'</title>');
        janela.document.write('</head><body>');  
        janela.document.write(document.getElementById("caixaNotaFechamento").innerHTML);
        janela.document.write('</body></html>');
        
      },500 );

    })
}

}
