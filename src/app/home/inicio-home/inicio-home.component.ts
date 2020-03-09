import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { Router } from '@angular/router';

import { PedidoService } from 'src/app/service/pedido.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-inicio-home',
  templateUrl: './inicio-home.component.html',
  styleUrls: ['./inicio-home.component.css']
})
export class InicioHomeComponent implements OnInit {

  verifCarregamento: boolean[] = [false, false, false, false];
  verifDadosPrincipais: boolean;
  labelAbrirPedido: string = "Abrir Pedido";
  disabledAbrirPedido: boolean = false;

  constructor(private pedidoService: PedidoService,
    private dataService: DataService) { }

  ngOnInit() {
    setTimeout(() => { $("#menu").fadeIn(500) }, 500);
    this.dataService.verifDadosPrincipaisMessage
      .subscribe(dadosPrincipais => {
        this.verifDadosPrincipais = dadosPrincipais
      });
  }

  abrirPedido() {
    this.disabledAbrirPedido = true;
    this.labelAbrirPedido = "Aguarde um momento";
  }

}
