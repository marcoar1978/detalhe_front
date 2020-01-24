import { Injectable } from '@angular/core';
import { Protetico } from '../model/protetico.model';
import { PedidoService } from 'src/app/service/pedido.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProteticoResolve implements Resolve<Protetico[]>{

    constructor(private pedidoService:PedidoService ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Protetico[] | Observable<Protetico[]> | Promise<Protetico[]> {
          return this.pedidoService.getProteticos();    
       
    }

}