import { Injectable } from '@angular/core';
import { Dentista } from '../model/dentista.model';
import { PedidoService } from 'src/app/service/pedido.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DentistaResolve implements Resolve<Dentista[]>{

    constructor(private pedidoService:PedidoService ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Dentista[] | Observable<Dentista[]> | Promise<Dentista[]> {
        return this.pedidoService.getDentistas();    
     
  }

}