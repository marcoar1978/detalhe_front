import { Injectable } from '@angular/core';
import { PedidoService } from 'src/app/service/pedido.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AbrirPedidoResolve implements Resolve<number>{

    constructor(private pedidoService:PedidoService ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): number | Observable<number> | Promise<number> {
        return this.pedidoService.abrirPedido();
           
    }
}