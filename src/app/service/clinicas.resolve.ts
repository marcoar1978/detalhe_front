import { Injectable } from '@angular/core';
import { Clinica } from '../model/clinica.model';
import { PedidoService } from 'src/app/service/pedido.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ClinicaResolve implements Resolve<Clinica[]>{
    clinicas:Clinica[];

    constructor(private pedidoService:PedidoService ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Clinica[] | Observable<Clinica[]> | Promise<Clinica[]> {
        return this.pedidoService.getClinicas();
           
    }

}

