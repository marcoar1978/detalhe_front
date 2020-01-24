import { Component, OnInit } from '@angular/core';

import { PedidoService } from 'src/app/service/pedido.service';
import { Clinica } from 'src/app/model/clinica.model';
import { Protetico } from 'src/app/model/protetico.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-abrirpedido',
  templateUrl: './abrirpedido.component.html',
  styleUrls: ['./abrirpedido.component.css']
})
export class AbrirpedidoComponent implements OnInit {
  clinicas:Clinica[];
  proteticos:Protetico[];

  constructor(private pedidoService:PedidoService, private actRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.clinicas =  this.actRoute.snapshot.data['clinicas'];
    console.log(this.clinicas); 
    
    this.proteticos = this.actRoute.snapshot.data['proteticos'];
    console.log(this.proteticos);
  }

  

}
