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
  totalEntrega:number; 
  nomeClinica: string;
  obs:string;
  dataEntrega:string;

  constructor(private actRoute: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {
    this.dataService.pedidosAEntregarMessage
        .subscribe(res => { 
          this.pedidos = res; 
          this.totalEntrega= this.pedidos
          .reduce((prevVal, pedido) => {return prevVal + pedido.valorLiquido },0);
        });
    
    this.actRoute.queryParams.subscribe(queryParams => this.nomeClinica = queryParams.nomeClinica)
    
    this.actRoute.queryParams.subscribe(queryParams => this.obs = queryParams.obs);
   
    this.actRoute.queryParams.subscribe(queryParams => this.dataEntrega = queryParams.dataEntrega);
 }

 imprimir(){
  const janela = window.open('', 'PRINT', 'height=600,width=800');
  janela.document.write('<html><head><title>Nota de Entrega nº XX</title>');
  janela.document.write('</head><body>');  
  janela.document.write(document.getElementById("caixaNotaEntrega").innerHTML);
  janela.document.write('</body></html>');
  janela.print();
  janela.close();
}

}
