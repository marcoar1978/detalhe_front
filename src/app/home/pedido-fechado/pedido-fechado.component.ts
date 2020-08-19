import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from 'src/app/model/pedido.model';
import { DataService } from 'src/app/service/data.service';
import { Item } from 'src/app/model/item.model';

@Component({
  selector: 'app-pedido-fechado',
  templateUrl: './pedido-fechado.component.html',
  styleUrls: ['./pedido-fechado.component.css']
})
export class PedidoFechadoComponent implements OnInit {

  pedidoId: string;
  pedidoSelecionado: Pedido;
  itemComDesconto: Item[] = [];

  constructor(private actRoute: ActivatedRoute,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit() {
    this.pedidoId = this.actRoute.snapshot.params.pedidoId;
    this.dataService.pedidoFechadoMessage.subscribe(res => {
      this.pedidoSelecionado = res;
      this.itemComDesconto = this.pedidoSelecionado.itens.filter((i) => i.desconto > 0);
    });
  }

  abrirNovoPedido() {
    this.router.navigate(['home/abrirPedido']);
  }

  imprimirPedidoFechado() {
    setTimeout(() => {
      const janela = window.open('', 'PRINT', 'height=600,width=700');
      janela.document.write('<html><head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">');
      janela.document.write('<title>Pedido nº ' + this.pedidoSelecionado.id + '</title>');
      janela.document.write('</head><body><br>');
      janela.document.write(document.getElementById("caixaPedidoFechado").innerHTML);
      janela.document.write('</body></html>');
    }, 500)
  }

}
