import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Entrega } from 'src/app/model/entrega.model';
import { EntregaService } from 'src/app/service/entregas.service';
import { Clinica } from 'src/app/model/clinica.model';
import { DataService } from 'src/app/service/data.service';
import { DadosIniciais } from 'src/app/model/dados-iniciais.model';
import { Fechamento } from 'src/app/model/fechamento.model';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.component.html',
  styleUrls: ['./entregas.component.css']
})
export class EntregasComponent implements OnInit {

  entregas: Entrega[];
  entregaSelecionada: Entrega = new Entrega();
  entregasCheckadas: Entrega[] = [];
  totalEntregaSelecionada: number;
  nomeClinicaSelecionada: string;
  clinicasComEntregas: Clinica[];
  clinicas: Clinica[];
  clinica: Clinica;
  carregamentoClinicas: boolean = false;
  carregamentoEntregas: boolean = false;
  dadosIniciais: DadosIniciais;
  obs: string;
  verifCheckFechamento: boolean;
  modalConferencia: any;
  totalFechamento: number;
  labelConfFechamento: string = "Confirmar Fechamento";
  disabledConfFechamento: boolean = false;
  entregasId: number[] = [];

  constructor(private entregaService: EntregaService,
    private modalService: NgbModal,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit() {
    this.dataService.dadosIniciaisMessage.subscribe(res => this.dadosIniciais = res);

    this.dataService.clinicaMessage
      .subscribe(res => {
        this.clinicas = res;
        this.carregamentoClinicas = true;
        this.escondeAlert(this.carregamentoClinicas, this.carregamentoEntregas);
      });

    this.entregaService.listaEntregas()
      .subscribe(res => {
        this.entregas = res;
        this.entregas.forEach(entrega => {
          if (entrega.recebedor) {
            entrega.displayComRecebedor = "";
            entrega.displaySemRecebedor = "none";
          }
          else {
            entrega.displayComRecebedor = "none";
            entrega.displaySemRecebedor = "";
          }
        })

        this.clinicasComEntregas = this.clinicas.filter(clinica => {
          let verifClinica: boolean = false;
          for (let i = 0; i < this.entregas.length; i++) {
            if (this.entregas[i].clinicaId == clinica.id) {
              verifClinica = true;

            };
          }
          return verifClinica;
        });
        this.carregamentoEntregas = true;
        this.escondeAlert(this.carregamentoClinicas, this.carregamentoEntregas);

      })
  }

  escondeAlert(carregamentoClinicas: boolean, carregamentoPedidos: boolean) {

    if ((carregamentoClinicas) && (carregamentoPedidos)) {
      $("#divAguardar").slideUp(350);
    }
  }

  abreModalEntrega(entregaId: number, nomeClinica: string) {
    this.nomeClinicaSelecionada = nomeClinica;
    this.entregaSelecionada = this.entregas.find(entrega => entrega.id == entregaId);
    this.totalEntregaSelecionada = this.entregaSelecionada.pedidos
      .reduce((prevVal, pedido) => { return prevVal + pedido.valorLiquido }, 0);

    setTimeout(() => {
      const janela = window.open('', 'PRINT', 'height=600,width=800');
      janela.document.write('<html><head><title>NotaEntrega' + entregaId + '</title>');
      janela.document.write('</head><body>');
      janela.document.write(document.getElementById("caixaNotaEntrega").innerHTML);
      janela.document.write('</body></html>');
    }, 500)
  }

  cadastraRecebedor(entregaId: number) {
    let recebedor = $("#textRecebedor_" + entregaId).val();
    let dataRecebimento = $("#dataRecebedor_" + entregaId).val();
    if ((recebedor) && (dataRecebimento)) {

      $("#dataSemRecebedor_" + entregaId).fadeOut(350)

      $("#nomeSemRecebedor_" + entregaId).fadeOut(350);

      $("#checkSemRecebedor_" + entregaId).fadeOut(350);

      this.entregaService.registraRecebedor(entregaId, recebedor, dataRecebimento)
        .subscribe(res => {
          let dataRecebSplit = dataRecebimento.split("-");
          let dataRecebFormat = dataRecebSplit[2] + "/" + dataRecebSplit[1] + "/" + dataRecebSplit[0];
          $("#dataComRecebedor_" + entregaId).empty();
          $("#dataComRecebedor_" + entregaId).append(dataRecebFormat);
          $("#dataComRecebedor_" + entregaId).fadeIn(350);

          $("#nomeComRecebedor_" + entregaId).empty();
          $("#nomeComRecebedor_" + entregaId).append(recebedor);
          $("#nomeComRecebedor_" + entregaId).fadeIn(350);
          $("#checkComRecebedor_" + entregaId).fadeIn(350);

        }, error => alert("Problemas no Banco de Dados"));
    }
  }

  checkEntrega(clinicaId: number, entregaId: number) {
    this.verifCheckFechamento = false;
    this.entregas.forEach(entrega => {
      if (entrega.id == entregaId) {
        entrega.checkFechamento = $('#checkEntrega_' + entregaId).prop("checked");
      }
    })

    this.entregas.forEach(entrega => {
      if ((entrega.clinicaId == clinicaId) && (entrega.checkFechamento)) {
        this.verifCheckFechamento = true;
      }
    })

    if (this.verifCheckFechamento) {
      $("#botaoRegistrarFechamento_" + clinicaId).slideDown(350);
    }
    else {
      $("#botaoRegistrarFechamento_" + clinicaId).slideUp(350);
    }
  }

  conferirFechamento(clinicaId: number, conferenciaFechamento) {
    this.entregasCheckadas = this.entregas.filter(entrega => ((entrega.clinicaId == clinicaId) && (entrega.checkFechamento)));
    this.totalFechamento = this.entregasCheckadas
      .reduce((prevVal, entregasCheckada) => { return prevVal + entregasCheckada.totalEntrega }, 0);

    this.clinica = this.clinicas.find(clinica => clinica.id == clinicaId);
    this.modalConferencia = this.modalService.open(conferenciaFechamento, { centered: true, size: 'lg', scrollable: true });
  }

  confirmarFechamento(clinicaId: number) {
    this.labelConfFechamento = "Aguarde um momento";
    this.disabledConfFechamento = true;
    this.entregasCheckadas.forEach(entrega => { this.entregasId.push(entrega.id) });

    let fechamento: Fechamento = new Fechamento();
    fechamento.clinicaId = this.clinica.id;
    fechamento.dataFechamento = this.dadosIniciais.dataHoje;
    fechamento.entregas = this.entregasCheckadas;
    fechamento.entregasId = this.entregasId;
    fechamento.obs = this.obs;
    fechamento.valorTotal = this.totalFechamento;
    fechamento.valorPgto = 0;

    this.entregaService.registrarFechamento(fechamento)
      .subscribe(fechamentoId => {

        this.modalConferencia.close();
        this.dataService.altDataFechamentoConf(fechamento);
        this.router.navigate(['/home/confirmFechamento'], { queryParams: { nomeClinica: this.clinica.nomeSimp, fechamentoId } });
      }, error => {
        this.labelConfFechamento = "Confirmar Fechamento";
        this.disabledConfFechamento = false;
        alert("Problemas no Banco de Dados")
      });
  }




}


