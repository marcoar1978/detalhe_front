import { Component, OnInit, OnChanges, ViewChildren, QueryList, EventEmitter } from '@angular/core';
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
import { NgbdSortableHeader } from 'src/app/diretivas/sort.diretiva';
import { SortEvent, compare } from 'src/app/diretivas/sort.interface';

@Component({
  selector: 'app-consulta-pedidos',
  templateUrl: './consulta-pedidos.component.html',
  styleUrls: ['./consulta-pedidos.component.css']
})
export class ConsultaPedidosComponent implements OnInit {

  formExpandido: boolean = false;
  labelButtonForm: string = "Expandir";
  clinicas: Clinica[];
  clinica: Clinica = new Clinica();
  dadosIniciais: DadosIniciais;
  pedidosSelecionados: Pedido[] = [];
  pedidoSelecionado: Pedido = new Pedido();
  pedidos: Pedido[];
  form: FormGroup;
  mgsPedidoId: string;
  msgNomePaciente: string;
  msgClinica: string;
  entregaSelecionada: Entrega = new Entrega();
  totalEntregaSelecionada: number;
  situacaoPgto: string;
  fechamentoSelecionado: Fechamento = new Fechamento();
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  anoMes: string;

  constructor(private dataService: DataService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private pedidoService: PedidoService,
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
      .subscribe(res => {
        this.dadosIniciais = res;
        const dataSplit = this.dadosIniciais.dataHoje.split("-");
        this.anoMes = dataSplit[0] + "-" + dataSplit[1];
      })

  }

  expandeFormConsulta() {
    $("#buttonExpandeFormConsulta").prop("disabled", true);
    if (this.formExpandido == false) {
      $("#divFormConsulta").animate({ width: "680px" }, 200, "linear", () => {
        $("#divFormConsulta").animate({ height: "280px" },
          {
            complete: () => {
              $("#formConsulta").fadeIn(250);
              $("#divFormConsulta").css('box-shadow', '10px 10px 10px -6px rgba(0,0,0,0.75)');
              $("#pedidoId").focus();
              $("#buttonExpandeFormConsulta").prop("disabled", false);
            }
          })
      }
      );
    }

    if (this.formExpandido == true) {
      $("#formConsulta").fadeOut(250, () => {
        $("#divFormConsulta").animate({ height: "55px" }, () => {
          $("#divFormConsulta").animate({ width: "110px" }, 200, "linear");
          $("#divFormConsulta").css('box-shadow', '');
          $("#buttonExpandeFormConsulta").prop("disabled", false);
        })
      });
    }

    if (this.formExpandido) {
      this.formExpandido = false;
      this.labelButtonForm = "Expandir";
    }
    else {
      this.formExpandido = true;
      this.labelButtonForm = "Reduzir";
    }
  }

  consultaPorId(content) {
    let pedidoId = $("#pedidoId").val();
    if (!pedidoId) {
      alert("Digite o número do pedido");
      return;
    }

    $('#divMgsPedidoId').slideUp(350, () => {
      $('#divMgsPedidoId').css('font-weight', 'normal');
      $('#divMgsPedidoId').css('color', 'green');
      this.mgsPedidoId = "Aguarde um momento";
      $('#divMgsPedidoId').slideDown(350);
    })


    this.pedidoService.consultaPorId(pedidoId)
      .subscribe(res => {

        $('#divMgsPedidoId').slideUp(350, () => {
          this.mgsPedidoId = "";
        });
        this.pedidoSelecionado = res;

        if (this.pedidoSelecionado.entrega && this.pedidoSelecionado.entrega.fechamento) {
          if ((this.pedidoSelecionado.entrega.fechamento.valorTotal - this.pedidoSelecionado.entrega.fechamento.valorPgto) == 0) {
            this.situacaoPgto = "Pago";
          }
          else {
            this.situacaoPgto = "Incompleto";
          }
        }

        this.modalService.open(content, { centered: true, size: 'lg', scrollable: true });
      }, error => {
        $('#divMgsPedidoId').slideUp(350, () => {
          this.mgsPedidoId = "";
          if (error.status == 400) {
            $('#divMgsPedidoId').css('font-weight', 'bold');
            $('#divMgsPedidoId').css('color', 'red');
            this.mgsPedidoId = "Número da entrega não existe";
            $('#divMgsPedidoId').slideDown(350, () => {
              setTimeout(() => $('#divMgsPedidoId').slideUp(350), 4000);
            })
          }
          else {
            $('#divMgsPedidoId').slideUp(350);
            alert("Problemas para acessar o banco de dados");
          }
        });

      });
  }

  consultaNomePaciente() {
    let nomePaciente = $("#nomePaciente").val();
    if (!nomePaciente) {
      alert("Digite o nome do paciente");
      return;
    }


    $('#divMsgNomePaciente').css('font-weight', 'normal');
    $('#divMsgNomePaciente').css('color', 'green');
    this.msgNomePaciente = "Aguarde um momento";
    $('#divMsgNomePaciente').slideDown(150);


    this.pedidoService.consultaPorPaciente(nomePaciente)
      .subscribe(res => {
        $("#nomePaciente").val("");
        this.pedidosSelecionados = res;
        if (this.pedidosSelecionados.length == 0) {


          $('#divMsgNomePaciente').slideUp(150, () => {
            $('#divMsgNomePaciente').css('font-weight', 'bold');
            $('#divMsgNomePaciente').css('color', 'red');
            this.msgNomePaciente = "Nome deste paciente não existe";
            $('#divMsgNomePaciente').slideDown(150, () => {

              setTimeout(() => { $('#divMsgNomePaciente').slideUp(150); }, 4000);
            });
          })

          /*
          $('#divMsgNomePaciente').slideUp(350, () => {
            $('#divMsgNomePaciente').css('font-weight','bold');
            $('#divMsgNomePaciente').css('color','red');
            this.msgNomePaciente = "Nome deste paciente não existe";
            $('#divMsgNomePaciente').slideDown(350, () => {
              setTimeout( () => { $('#divMsgNomePaciente').slideUp(350);}, 4000);
            });
          });
          */
          return;
        }

        this.pedidosSelecionados.forEach(pedidoSelecionado => {
          const clinica: Clinica = this.clinicas.find(clinica => clinica.id == pedidoSelecionado.clinicaId);
          pedidoSelecionado.clinica = clinica.nomeSimp;

          if (!pedidoSelecionado.entrega) {
            pedidoSelecionado.status = "Aberto";
            pedidoSelecionado.corFonteStatus = "blue";
          }
          else if (pedidoSelecionado.entrega && !pedidoSelecionado.entrega.fechamento) {
            pedidoSelecionado.status = "Entrega";
            pedidoSelecionado.corFonteStatus = "orange";
          }
          else if (pedidoSelecionado.entrega && pedidoSelecionado.entrega.fechamento) {
            pedidoSelecionado.status = "Fechamento";
            pedidoSelecionado.corFonteStatus = "green";
          }


        })

        $('#divMsgNomePaciente').slideUp(350);
        $("#tabelaPedidos").fadeOut(350, () => {
          this.labelButtonForm = "Expandir";
          $("#tabelaPedidos").fadeIn(350);
        });

        /*
        $('#divMsgNomePaciente').slideUp(350, () => {
         $("#formConsulta").fadeOut(250, () => {
           $("#divFormConsulta").animate({height: "55px"},  () => {
             $("#divFormConsulta").animate({width: "110px"}, 200, "linear");
             $("#divFormConsulta").css('box-shadow','');
             this.mgsPedidoId = "";
             $("#tabelaPedidos").fadeOut(350, () => {
               this.labelButtonForm = "Expandir";
               $("#tabelaPedidos").fadeIn(350);
             }); 
             
         })  
       });
     });
     */
      }, error => {
        $('divMsgNomePaciente').slideUp(350);
        alert("Problemas ao acessar o banco de dados");
      })
  }

  consultaPorClinica() {
    const data = $("#mesAno").val();
    const dataSplit = data.split("-");
    const ano = dataSplit[0];
    const mes = dataSplit[1];
    const clinicaId = $("#clinicaId").val();

    if (!clinicaId) {
      alert("Selecione a clínica");
      return;
    }


    $('#divMsgClinica').css('font-weight', 'normal');
    $('#divMsgClinica').css('color', 'green');
    this.msgClinica = "Aguarde um momento";
    $('#divMsgClinica').slideDown(150);


    this.pedidoService.consultaPorClinica(clinicaId, ano, mes)
      .subscribe(res => {
        this.pedidosSelecionados = res;
        if (this.pedidosSelecionados.length == 0) {


          $('#divMsgClinica').slideUp(150, () => {
            $('#divMsgClinica').css('font-weight', 'bold');
            $('#divMsgClinica').css('color', 'red');
            this.msgClinica = "Não há registros neste período";
            $('#divMsgClinica').slideDown(150, () => {

              setTimeout(() => { $('#divMsgClinica').slideUp(150); }, 4000);
            });
          })

          /*  
          $('#divMsgClinica').slideUp(350, () => {
            $('#divMsgClinica').css('font-weight', 'bold');
            $('#divMsgClinica').css('color', 'red');
            this.msgClinica = "Não há registros neste período";
            $('#divMsgClinica').slideDown(350, () => {
              setTimeout(() => { $('#divMsgClinica').slideUp(350); }, 4000);
            });
          });
          */
          return;
        }

        this.pedidosSelecionados.forEach(pedidoSelecionado => {
          const clinica: Clinica = this.clinicas.find(clinica => clinica.id == pedidoSelecionado.clinicaId);
          pedidoSelecionado.clinica = clinica.nomeSimp;

          if (!pedidoSelecionado.entrega) {
            pedidoSelecionado.status = "Aberto";
            pedidoSelecionado.corFonteStatus = "blue";
          }
          else if (pedidoSelecionado.entrega && !pedidoSelecionado.entrega.fechamento) {
            pedidoSelecionado.status = "Entrega";
            pedidoSelecionado.corFonteStatus = "orange";
          }
          else if (pedidoSelecionado.entrega && pedidoSelecionado.entrega.fechamento) {
            pedidoSelecionado.status = "Fechamento";
            pedidoSelecionado.corFonteStatus = "green";
          }
        });

        $('#divMsgClinica').slideUp(150);

        $("#tabelaPedidos").fadeOut(350, () => {
          this.labelButtonForm = "Expandir";
          $("#tabelaPedidos").fadeIn(350);
        });

        /*
           $('#divMsgClinica').slideUp(350, () => {
            $("#formConsulta").fadeOut(250, () => {
              $("#divFormConsulta").animate({height: "55px"},  () => {
                $("#divFormConsulta").animate({width: "110px"}, 200, "linear");
                $("#divFormConsulta").css('box-shadow','');
                this.mgsPedidoId = "";
                $("#tabelaPedidos").fadeOut(350, () => {
                  this.labelButtonForm = "Expandir";
                  $("#tabelaPedidos").fadeIn(350);
                }); 
                
            })  
          });
        });
         */

      }, error => {
        $('#divMsgClinica').slideUp(350);
        alert("Problemas ao acessar o banco de dados");
      })

  }

  escondeDivConsulta() {
    $("#formConsulta").fadeOut(250, () => {
      $("#divFormConsulta").animate({ height: "55px" }, () => {
        $("#divFormConsulta").animate({ width: "110px" }, 200, "linear");
        $("#divFormConsulta").css('box-shadow', '');
      })
    });
  }

  getEntrega(entregaId: number) {
    $("#divAlertEntrega").slideDown(350);

    this.entregaService.getEntrega(entregaId)
      .subscribe(res => {
        this.entregaSelecionada = res;
        this.clinica = this.clinicas.find(clinica => clinica.id == this.entregaSelecionada.clinicaId);
        this.totalEntregaSelecionada = this.entregaSelecionada.pedidos
          .reduce((prevVal, pedido) => { return prevVal + pedido.valorLiquido }, 0);

        setTimeout(() => {
          const janela = window.open('', 'PRINT', 'height=600,width=800');
          janela.document.write('<html><head><title>NotaEntrega' + entregaId + '</title>');
          janela.document.write('</head><body>');
          janela.document.write(document.getElementById("caixaNotaEntrega").innerHTML);
          janela.document.write('</body></html>');
          $("#divAlertEntrega").slideUp(350);
        }, 500)
      }, error => {
        alert("Problema ao acessar o banco de dados")
        $("#divAlertEntrega").slideUp(350);

      })
  }

  getFechamento(fechamentoId: number) {
    $("#divAlertFechamento").slideDown(350);

    this.fechamentoService.getFechamento(fechamentoId)
      .subscribe(res => {
        this.fechamentoSelecionado = res;
        this.clinica = this.clinicas.find(clinica => clinica.id == this.fechamentoSelecionado.clinicaId)
        setTimeout(() => {
          const janela = window.open('', 'PRINT', 'height=600,width=800');
          janela.document.write('<html><head><title>NotaEntrega' + fechamentoId + '</title>');
          janela.document.write('</head><body>');
          janela.document.write(document.getElementById("caixaNotaFechamento").innerHTML);
          janela.document.write('</body></html>');
          $("#divAlertFechamento").slideUp(350);
        }, 500)
      }, error => {
        alert("Problema ao acessar o banco de dados")
        $("#divAlertFechamento").slideUp(350);

      })
  }

  consultaDetPedidoCliente(pedidoId: number, content) {
    $(`#msgDetalhePedido_${pedidoId}`).fadeIn(250);
    this.pedidoService.consultaPorId(pedidoId)
      .subscribe(res => {
        $(`#msgDetalhePedido_${pedidoId}`).fadeOut(250);

        this.pedidoSelecionado = res;
        if (this.pedidoSelecionado.entrega && this.pedidoSelecionado.entrega.fechamento) {
          if ((this.pedidoSelecionado.entrega.fechamento.valorTotal - this.pedidoSelecionado.entrega.fechamento.valorPgto) == 0) {
            this.situacaoPgto = "Pago";
          }
          else {
            this.situacaoPgto = "Incompleto";
          }
        }
        this.modalService.open(content, { centered: true, size: 'lg', scrollable: true });
      }, error => {
        $(`#msgDetalhePedido_${pedidoId}`).fadeOut(250, () => {
          alert("Problemas para acessar o banco de dados");
        });

      });
  }

  onSort({ column, direction }: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (direction === '') {
      this.pedidosSelecionados = this.pedidosSelecionados;
    } else {
      this.pedidosSelecionados = [...this.pedidosSelecionados].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

}
