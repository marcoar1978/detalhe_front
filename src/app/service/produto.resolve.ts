import { Injectable } from '@angular/core';
import { Produto } from '../model/produto.model';
import { PedidoService } from 'src/app/service/pedido.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProdutoResolve implements Resolve<Produto[]>{

    constructor(private pedidoService:PedidoService){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Produto[] | Observable<Produto[]> | Promise<Produto[]> {
       return this.pedidoService.getProdutos();
    }

}