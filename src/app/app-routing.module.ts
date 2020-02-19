import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AbrirpedidoComponent } from './home/abrirpedido/abrirpedido.component';
import { CadastroclinicaComponent } from './home/cadastroclinica/cadastroclinica.component';
import { AuthGuard } from './service/authguard.service';
import { ClinicaResolve } from './service/clinicas.resolve';
import { ProteticoResolve } from './service/protetico.resolve';
import { ProdutoResolve } from './service/produto.resolve';
import { DentistaResolve } from './service/dentista.resolve';
import { AbrirPedidoResolve } from './service/abrirPedido.resolve';
import { PedidoFechadoComponent } from './home/pedido-fechado/pedido-fechado.component';
import { PedidosEmProcessoComponent } from './home/pedidos-em-processo/pedidos-em-processo.component';
import { ConfirmEntregaComponent } from './home/confirm-entrega/confirm-entrega.component';
import { DadosIniciaisResolve } from './service/dadosIniciais.resolve';
import { EntregasComponent } from './home/entregas/entregas.component';
import { ConfirmFechamentoComponent } from './home/confirm-fechamento/confirm-fechamento.component';

const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] , 
                  resolve: {clinicas: ClinicaResolve, proteticos: ProteticoResolve, produtos: ProdutoResolve, dentistas: DentistaResolve, dadosIniciais: DadosIniciaisResolve }, children:[
      { path: 'abrirPedido', component: AbrirpedidoComponent, resolve: {aberturaPedido: AbrirPedidoResolve } },
      { path: 'pedidoFechado/:pedidoId', component: PedidoFechadoComponent },
      { path: 'pedidosEmProcesso', component: PedidosEmProcessoComponent },
      { path: 'confirmaEntregaPedido', component: ConfirmEntregaComponent },
      { path: 'cadastroClinica', component: CadastroclinicaComponent },
      { path: 'entregas', component: EntregasComponent },
      { path: 'confirmFechamento', component: ConfirmFechamentoComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
