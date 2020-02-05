import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './home.component';
import { AbrirpedidoComponent } from './abrirpedido/abrirpedido.component';
import { CadastroclinicaComponent } from './cadastroclinica/cadastroclinica.component';
import { InterceptorService } from '../service/interceptor.service';
import { PedidoFechadoComponent } from './pedido-fechado/pedido-fechado.component';
import { PedidosEmProcessoComponent } from './pedidos-em-processo/pedidos-em-processo.component';


@NgModule({
  declarations: [ HomeComponent, AbrirpedidoComponent, CadastroclinicaComponent, PedidoFechadoComponent, PedidosEmProcessoComponent ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule

  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi:true

    }
  ]
})
export class HomeModule { }
