import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Pedido } from 'src/app/model/pedido.model';
import { Clinica } from 'src/app/model/clinica.model';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-confirm-entrega',
  templateUrl: './confirm-entrega.component.html',
  styleUrls: ['./confirm-entrega.component.css']
})
export class ConfirmEntregaComponent implements OnInit {
  
  pedidos:Pedido[];  
  nomeClinica: string;
  obs:string;
  dataEntrega:string;

  constructor(private actRoute: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {
    this.dataService.pedidosAEntregarMessage.subscribe(res => this.pedidos = res );
    console.log(this.pedidos);
    this.actRoute.queryParams.subscribe(queryParams => this.nomeClinica = queryParams.nomeClinica)
    console.log(this.nomeClinica);
    this.actRoute.queryParams.subscribe(queryParams => this.obs = queryParams.obs);
    console.log(this.obs);
    this.actRoute.queryParams.subscribe(queryParams => this.dataEntrega = queryParams.dataEntrega);
    console.log(this.dataEntrega);

  }

}
