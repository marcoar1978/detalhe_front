import { Component, OnInit } from '@angular/core';
import { FechamentoService } from 'src/app/service/fechamento.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as $ from "jquery";

import { DataService } from 'src/app/service/data.service';
import { DadosIniciais } from 'src/app/model/dados-iniciais.model';
import { Fechamento } from 'src/app/model/fechamento.model';
import { Clinica } from 'src/app/model/clinica.model';
import { Entrega } from 'src/app/model/entrega.model';
import { Pgto } from 'src/app/model/pgto.model';

@Component({
  selector: 'app-fechamentos',
  templateUrl: './fechamentos.component.html',
  styleUrls: ['./fechamentos.component.css']
})
export class FechamentosComponent implements OnInit {
  
  dadosIniciais:DadosIniciais;
  fechamentos:Fechamento[];
  fechamentoSelecionado:Fechamento = new Fechamento();
  clinicas:Clinica[];
  nomeClinica:string;
  clinicasComFechamento:Clinica[];
  carregamentoClinicas:boolean;
  carregamentoFechamentos:boolean;
  entregaSelecionada:Entrega = new Entrega();
  modalCadastro:any;
  pagamentosEfetuados:Pgto[] = [];
  dataCadastroPgto:string;
  valorCadastroPgto:number;
  labelConfPgto:string = "Inserir Pagamento";
  disabledConfPgto:boolean = false;
  obsCadastroPgto:string;

  constructor(private fechamentoService: FechamentoService,
    private modalService: NgbModal,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit() {
    this.dataService.dadosIniciaisMessage.subscribe(res => this.dadosIniciais = res);
    this.dataCadastroPgto = this.dadosIniciais.dataHoje;
    this.dataService.clinicaMessage
      .subscribe(res => { 
        this.clinicas = res;
        console.log(this.clinicas);
        this.carregamentoClinicas = true;
       this.escondeAlert();
      });

      this.fechamentoService.listaFechamentos()
        .subscribe(res => {
          this.fechamentos = res;
          
          console.log(this.fechamentos);
          this.clinicasComFechamento = this.clinicas.filter(clinica => {
            let verifClinicaComFechamento = false;
            for(let i = 0; i < this.fechamentos.length; i++){
              if(this.fechamentos[i].clinicaId == clinica.id){
                verifClinicaComFechamento = true;
              }
            }
            return verifClinicaComFechamento;
          })
          console.log(this.clinicasComFechamento);
          this.carregamentoFechamentos = true;
          this.escondeAlert();
        })
  }

  escondeAlert(){
      
    if((this.carregamentoClinicas) && (this.carregamentoFechamentos)){
      $("#divAguardarDados").slideUp(350);
    }
  }

  abreModalFechamento(fechamentoId:number, nomeClinica:string){
    this.nomeClinica = nomeClinica;
    this.fechamentoSelecionado = this.fechamentos.find(fechamento => fechamento.id == fechamentoId);
    setTimeout(() => {
      const janela = window.open('', 'PRINT', 'height=600,width=800');
      janela.document.write('<html><head><title>NotaFechamento'+fechamentoId+'</title>');
      janela.document.write('</head><body>');  
      janela.document.write(document.getElementById("caixaNotaFechamento").innerHTML);
      janela.document.write('</body></html>');
    },500 );

  }

  abreModalEntrega(fechamentoId:number, entregaId:number, nomeClinica:string){
    this.nomeClinica = nomeClinica;
    this.fechamentoSelecionado = this.fechamentos.find(fechamento => fechamento.id == fechamentoId);
    this.entregaSelecionada = this.fechamentoSelecionado.entregas.find(entrega => entregaId == entregaId);
    setTimeout(() => {
      const janela = window.open('', 'PRINT', 'height=600,width=800');
      janela.document.write('<html><head><title>NotaEntrega'+entregaId+'</title>');
      janela.document.write('</head><body>');  
      janela.document.write(document.getElementById("caixaNotaEntrega").innerHTML);
      janela.document.write('</body></html>');
    },500 );
  }

  abreModalPagamento(fechamentoId:number, cadastroPagamento ){
    this.fechamentoSelecionado = this.fechamentos.find(fechamento => fechamento.id == fechamentoId);
    this.valorCadastroPgto = this.fechamentoSelecionado.valorTotal - this.fechamentoSelecionado.valorPgto;
    this.valorCadastroPgto.toFixed(2);
    this.pagamentosEfetuados = this.fechamentoSelecionado.pgtos;
    this.modalCadastro = this.modalService.open(cadastroPagamento, { centered: true, size: 'lg',scrollable: true });
  }

}
