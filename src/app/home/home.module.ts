import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LOCALE_ID } from '@angular/core';
import { NgPrintModule } from 'ng-print';

import { HomeComponent } from './home.component';
import { AbrirpedidoComponent } from './abrirpedido/abrirpedido.component';
import { CadastroclinicaComponent } from './cadastroclinica/cadastroclinica.component';
import { InterceptorService } from '../service/interceptor.service';
import { PedidoFechadoComponent } from './pedido-fechado/pedido-fechado.component';
import { PedidosEmProcessoComponent } from './pedidos-em-processo/pedidos-em-processo.component';
import { ModalPedidoConsComponent } from './modal-pedido-cons/modal-pedido-cons.component';
import { ConfirmEntregaComponent } from './confirm-entrega/confirm-entrega.component';
import { EntregasComponent } from './entregas/entregas.component';
import { ConfirmFechamentoComponent } from './confirm-fechamento/confirm-fechamento.component';
import { FechamentosComponent } from './fechamentos/fechamentos.component';
import { StatusPedidosComponent } from './status-pedidos/status-pedidos.component';
import { InicioHomeComponent } from './inicio-home/inicio-home.component';
import { ImpressaoPedidosComponent } from './impressao-pedidos/impressao-pedidos.component';
import { ConsultaEntregasComponent } from './consultas/consulta-entregas/consulta-entregas.component';
import { ConsultaPedidosComponent } from './consultas/consulta-pedidos/consulta-pedidos.component';
import { NgbdTableSortable, NgbdSortableHeader } from '../teste/sort';
import { ConsultaFechamentosComponent } from './consultas/consulta-fechamentos/consulta-fechamentos.component';
import { NotaEntregaComponent } from './modals/nota-entrega/nota-entrega.component';
import { NotaFechamentoComponent } from './modals/nota-fechamento/nota-fechamento.component';
import { CadClinicaComponent } from './cadastro/cad-clinica/cad-clinica.component';

@NgModule({
  declarations: [HomeComponent, AbrirpedidoComponent, CadastroclinicaComponent, PedidoFechadoComponent, PedidosEmProcessoComponent, ModalPedidoConsComponent, ConfirmEntregaComponent, EntregasComponent, ConfirmFechamentoComponent, FechamentosComponent, StatusPedidosComponent, InicioHomeComponent, ImpressaoPedidosComponent, ConsultaEntregasComponent, ConsultaPedidosComponent, NgbdTableSortable, NgbdSortableHeader, ConsultaFechamentosComponent, NotaEntregaComponent, NotaFechamentoComponent, CadClinicaComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgPrintModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true

    },
    { provide: LOCALE_ID, useValue: "pt-BR" }
  ]
})
export class HomeModule { }
