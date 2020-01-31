import { Injectable } from '@angular/core';
import { PedidoService } from 'src/app/service/pedido.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AbrirPedido } from '../model/abrirPedido.model';

@Injectable({providedIn: 'root'})
export class AbrirPedidoResolve implements Resolve<AbrirPedido>{

    constructor(private pedidoService:PedidoService ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): AbrirPedido | Observable<AbrirPedido> | Promise<AbrirPedido> {
        return this.pedidoService.abrirPedido();
           
    }
}