import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pedido-fechado',
  templateUrl: './pedido-fechado.component.html',
  styleUrls: ['./pedido-fechado.component.css']
})
export class PedidoFechadoComponent implements OnInit {

  pedidoId:string;

  constructor(private actRoute:ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.pedidoId = this.actRoute.snapshot.params.pedidoId;
  }

  abrirNovoPedido(){
    this.router.navigate(['home/abrirPedido']);
  }

}
