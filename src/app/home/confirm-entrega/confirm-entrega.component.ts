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

  pedidos: Pedido[];
  totalEntrega: number;
  nomeClinica: string;
  entregaId: number;
  obs: string;


  constructor(private actRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router, ) { }

  ngOnInit() {
    this.dataService.pedidosAEntregarMessage
      .subscribe(res => {
        this.pedidos = res;
        this.totalEntrega = this.pedidos
          .reduce((prevVal, pedido) => { return prevVal + pedido.valorLiquido }, 0);
      });

    this.actRoute.queryParams.subscribe(queryParams => this.nomeClinica = queryParams.nomeClinica)
    this.actRoute.queryParams.subscribe(queryParams => this.obs = queryParams.obs);
    this.actRoute.queryParams.subscribe(queryParams => this.entregaId = queryParams.entregaId);
    this.actRoute.queryParams.subscribe(queryParams => this.totalEntrega = queryParams.totalEntrega);
  }

  acessoPedidosEmProcesso() {
    this.router.navigate(['home/pedidosEmProcesso']);
  }

  imprimir() {
    const janela = window.open('', 'PRINT', 'height=600,width=800');
    janela.document.write('<html><head><title>NotaEntrega' + this.entregaId + '</title>');
    janela.document.write('</head><body>');
    janela.document.write(document.getElementById("caixaNotaEntrega").innerHTML);
    janela.document.write('</body></html>');
    //janela.print();
    //janela.close();
  }

}
