import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Entrega } from 'src/app/model/entrega.model';

@Component({
  selector: 'app-nota-entrega',
  templateUrl: './nota-entrega.component.html',
  styleUrls: ['./nota-entrega.component.css']
})
export class NotaEntregaComponent implements OnInit, OnChanges {

  @Input() entregaSelecionadaInput: Entrega = new Entrega();
  @Input() nomeClinicaInput: string;
  entregaSelecionada: Entrega;
  nomeClinica: string;
  totalEntrega: number;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.entregaSelecionada = this.entregaSelecionadaInput;
    if (this.entregaSelecionada.pedidos != undefined) {
      this.totalEntrega = this.entregaSelecionada.pedidos.reduce((acc, pedido) => { return acc + pedido.valorLiquido }, 0)
    }
    this.nomeClinica = this.nomeClinicaInput;
  }

}
