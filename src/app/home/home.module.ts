import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { AbrirpedidoComponent } from './abrirpedido/abrirpedido.component';
import { CadastroclinicaComponent } from './cadastroclinica/cadastroclinica.component';
import { InterceptorService } from '../service/interceptor.service';



@NgModule({
  declarations: [ HomeComponent, AbrirpedidoComponent, CadastroclinicaComponent ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule

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
