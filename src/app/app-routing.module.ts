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


const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] , 
                  resolve: {clinicas: ClinicaResolve, proteticos: ProteticoResolve, produtos: ProdutoResolve, dentistas: DentistaResolve }, children:[
      { path: 'abrirPedido', component: AbrirpedidoComponent  },
      { path: 'cadastroClinica', component: CadastroclinicaComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
