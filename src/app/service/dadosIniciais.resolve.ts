import { Injectable } from '@angular/core';
import { DadosIniciais } from '../model/dados-iniciais.model';
import { PedidoService } from 'src/app/service/pedido.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DadosIniciaisResolve implements Resolve<DadosIniciais>{

    constructor(private pedidoService:PedidoService ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): DadosIniciais | Observable<DadosIniciais> | Promise<DadosIniciais> {
          return this.pedidoService.getDataEUsuario();    
       
    }

}