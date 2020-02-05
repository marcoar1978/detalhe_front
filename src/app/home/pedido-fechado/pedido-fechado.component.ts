import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from 'src/app/model/pedido.model';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-pedido-fechado',
  templateUrl: './pedido-fechado.component.html',
  styleUrls: ['./pedido-fechado.component.css']
})
export class PedidoFechadoComponent implements OnInit {

  pedidoId:string;
  pedidoFechado:Pedido;

  constructor(private actRoute:ActivatedRoute,
              private router: Router,
              private dataService: DataService) { }

  ngOnInit() {
    this.pedidoId = this.actRoute.snapshot.params.pedidoId;
    this.dataService.pedidoFechadoMessage.subscribe(res => { this.pedidoFechado = res });  
    console.log(this.pedidoFechado);
  }

  abrirNovoPedido(){
    this.router.navigate(['home/abrirPedido']);
  }

  imprimirPedidoFechado(){
    const janela = window.open('', 'PRINT', 'height=500,width=700');
    janela.document.write('<html><head><title>PedidoDetalhe'+this.pedidoFechado.id+'</title>');
    janela.document.write('</head><body>');  
    janela.document.write(document.getElementById("caixaPedidoFechado").innerHTML);
    janela.document.write('</body></html>');
    janela.print();
    janela.close();

  }

}
