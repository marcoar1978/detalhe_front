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
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Pedido } from 'src/app/model/pedido.model';
import { PedidoFechamento } from 'src/app/model/pedido-fechamento.model';

@Component({
  selector: 'app-fechamentos',
  templateUrl: './fechamentos.component.html',
  styleUrls: ['./fechamentos.component.css']
})
export class FechamentosComponent implements OnInit {

  dadosIniciais: DadosIniciais;
  fechamentoId: number;
  fechamentoIndex: number;
  fechamentos: Fechamento[];
  fechamentoSelecionado: Fechamento = new Fechamento();
  fechamentosPendentes: Fechamento[] = [];
  valorFechamentosPendentes: number;
  valorDevido: number;
  pedidosFechamento: PedidoFechamento[] = [];
  pedidosFechamentoSelecionado: PedidoFechamento[] = [];
  clinicas: Clinica[];
  nomeClinica: string;
  clinicasComFechamento: Clinica[];
  carregamentoClinicas: boolean;
  carregamentoFechamentos: boolean;
  entregaSelecionada: Entrega = new Entrega();
  modalCadastro: any;
  pagamentosEfetuados: Pgto[] = [];
  dataCadastroPgto: string;
  saldoFechamento: number;
  labelConfPgto: string = "Inserir Pagamento";
  disabledConfPgto: boolean = false;
  obsCadastroPgto: string;
  msgAlertValor: string;
  subjectDesconto: Subject<number> = new Subject<number>();

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
        this.carregamentoClinicas = true;
        this.escondeAlert();
      });

    this.fechamentoService.listaFechamentos()
      .subscribe(res => {
        this.fechamentos = res;
        this.clinicasComFechamento = this.clinicas.filter(clinica => {
          let verifClinicaComFechamento = false;
          for (let i = 0; i < this.fechamentos.length; i++) {
            if (this.fechamentos[i].clinicaId == clinica.id) {
              verifClinicaComFechamento = true;
            }
          }
          return verifClinicaComFechamento;
        })

        for (let i = 0; i < this.fechamentos.length; i++) {
          for (let f = 0; f < this.fechamentos[i].entregas.length; f++) {
            for (let k = 0; k < this.fechamentos[i].entregas[f].pedidos.length; k++) {
              const pedidoFech: PedidoFechamento = new PedidoFechamento();
              pedidoFech.fechamentoId = this.fechamentos[i].id;
              pedidoFech.entregaId = this.fechamentos[i].entregas[f].id;
              pedidoFech.pedido = this.fechamentos[i].entregas[f].pedidos[k];
              this.pedidosFechamento.push(pedidoFech);
            }
          }
        }
        this.carregamentoFechamentos = true;
        this.escondeAlert();
      })

    this.subjectDesc();
  }

  escondeAlert() {
    if ((this.carregamentoClinicas) && (this.carregamentoFechamentos)) {
      $("#divAguardar").slideUp(350);
    }
  }

  abreModalFechamento(fechamentoId: number, nomeClinica: string, clinicaId: number) {
    this.nomeClinica = nomeClinica;
    this.fechamentoSelecionado = this.fechamentos.find(fechamento => fechamento.id == fechamentoId);
    this.pedidosFechamentoSelecionado = this.pedidosFechamento.filter(pedido => pedido.fechamentoId == fechamentoId);
    this.fechamentosPendentes = this.fechamentos.filter(fechamento => fechamento.clinicaId == clinicaId && fechamento.id != fechamentoId);
    this.valorFechamentosPendentes = this.fechamentosPendentes.reduce((acc, fechamento) => acc + (fechamento.valorTotal - fechamento.valorPgto), 0);
    this.valorDevido = this.fechamentoSelecionado.valorTotal + this.valorFechamentosPendentes;


    setTimeout(() => {
      const janela = window.open('', 'PRINT', 'height=600,width=850');
      janela.document.write('<html><head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">');
      janela.document.write('<title>NotaFechamento' + fechamentoId + '</title>');
      janela.document.write('</head><body>');
      janela.document.write(document.getElementById("caixaNotaFechamento").innerHTML);
      janela.document.write('</body></html>');
    }, 500);

  }

  abreModalEntrega(fechamentoId: number, entregaId: number, nomeClinica: string) {
    this.nomeClinica = nomeClinica;
    this.fechamentoSelecionado = this.fechamentos.find(fechamento => fechamento.id == fechamentoId);
    this.entregaSelecionada = this.fechamentoSelecionado.entregas.find(entrega => entrega.id == entregaId);
    setTimeout(() => {
      const janela = window.open('', 'PRINT', 'height=600,width=800');
      janela.document.write('<html><head><title>NotaEntrega' + entregaId + '</title>');
      janela.document.write('</head><body>');
      janela.document.write(document.getElementById("caixaNotaEntrega").innerHTML);
      janela.document.write('</body></html>');
    }, 500);
  }

  abreModalPagamento(fechamentoId: number, cadastroPagamento) {
    this.dataCadastroPgto = this.dadosIniciais.dataHoje;;
    this.obsCadastroPgto = "";
    this.fechamentoSelecionado = this.fechamentos.find(fechamento => fechamento.id == fechamentoId);
    this.saldoFechamento = this.fechamentoSelecionado.valorTotal - this.fechamentoSelecionado.valorPgto;
    this.pagamentosEfetuados = this.fechamentoSelecionado.pgtos;
    this.modalCadastro = this.modalService.open(cadastroPagamento, { centered: true, size: 'lg', scrollable: true });
  }

  inserirPgto(fechamentoId: number) {
    if (!(this.verifValor())) {
      this.labelConfPgto = "Aguarde um momento";
      this.disabledConfPgto = true;
      let pgto: Pgto = new Pgto();
      pgto.fechamentoId = fechamentoId;
      pgto.dataPagamento = this.dataCadastroPgto;
      pgto.valor = Number($("#inputValorPgto").val());
      pgto.obs = this.obsCadastroPgto;

      this.fechamentoService.addPgto(pgto)
        .subscribe(res => {
          this.labelConfPgto = "Inserir Pagamento";
          this.disabledConfPgto = false;
          this.fechamentos.forEach(fechamento => {
            if (fechamento.id == fechamentoId) {
              fechamento.valorPgto += Number($("#inputValorPgto").val());
              fechamento.pgtos.push(pgto);
              $('#divValorPago_' + fechamentoId).empty();
              $('#divValorPago_' + fechamentoId).append("R$ " + fechamento.valorPgto.toFixed(2).replace(".", ","));
            }
          })
          this.modalCadastro.close();
        }, error => {
          this.labelConfPgto = "Inserir Pagamento";
          this.disabledConfPgto = false;
          alert("Erro ao acessar o banco de dados")
        });
    }
  }

  verifValor() {
    let inputValorPgto: number = Number($("#inputValorPgto").val());
    let verifError: boolean = false;
    if (inputValorPgto > this.saldoFechamento) {
      this.msgAlertValor = "Valor não pode ser maior que R$ " + this.saldoFechamento.toFixed(2);
      verifError = true;
    }
    if (inputValorPgto < 0) {
      this.msgAlertValor = "Valor não pode ser menor que R$ 0.00";
      verifError = true;
    }
    if (verifError) {
      $("#inputValorPgto").val(this.saldoFechamento.toFixed(2));
      $("#alertValor").slideDown(350, () => {
        setTimeout(() => {
          $("#alertValor").slideUp(350)
        }, 1500);
      })
    }

    return verifError;
  }

  insertDesconto(fechamentoId, i, valorfechamento: number) {
    this.fechamentoId = fechamentoId;
    this.fechamentoIndex = i;
    const desconto = $(`#inputDesconto_${fechamentoId}`).val();
    if (desconto >= 0 && desconto <= valorfechamento) {
      this.subjectDesconto.next(desconto);
    }
    else {
      alert("Valor de desconto incorreto");
      $(`#inputDesconto_${fechamentoId}`).val(0)
      this.subjectDesconto.next(0);
    }

  }

  subjectDesc() {
    this.subjectDesconto
      .pipe(debounceTime(1000))
      .subscribe(desconto => {
        const valorLiquido = this.fechamentos[this.fechamentoIndex].valorFechamento - desconto;
        this.fechamentos[this.fechamentoIndex].valorTotal = valorLiquido;
        this.fechamentoService.addDesconto(this.fechamentoId, desconto).subscribe(res => { });
      })
  }

}
