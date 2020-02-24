import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Pedido } from 'src/app/model/pedido.model';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-impressao-pedidos',
  templateUrl: './impressao-pedidos.component.html',
  styleUrls: ['./impressao-pedidos.component.css']
})
export class ImpressaoPedidosComponent implements OnInit {

  @Input() pedidosInput:Pedido[];
  pedidos:Pedido[] = [];
  qdePedidos:number;
  dataRelatorio:string;
  horaRelatorio:string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.dadosIniciaisMessage.subscribe(res => {this.dataRelatorio = res.dataHoje});
    const hoje = new Date();
    this.horaRelatorio = hoje.getHours()+":"+hoje.getMinutes();
  }

  ngOnChanges() {
   this.pedidos = this.pedidosInput;
   this.qdePedidos = this.pedidosInput.length;
   }

}
