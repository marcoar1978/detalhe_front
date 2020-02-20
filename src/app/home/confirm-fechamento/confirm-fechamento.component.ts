import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from 'src/app/service/data.service';
import { Fechamento } from 'src/app/model/fechamento.model';



@Component({
  selector: 'app-confirm-fechamento',
  templateUrl: './confirm-fechamento.component.html',
  styleUrls: ['./confirm-fechamento.component.css']
})
export class ConfirmFechamentoComponent implements OnInit {
  
  nomeClinica:string;
  fechamento:Fechamento;
  fechamentoId:number;

  constructor(private dataService: DataService,
              private actRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.actRoute.queryParams.subscribe(queryParams => 
        {
          this.nomeClinica = queryParams.nomeClinica;
          this.fechamentoId = queryParams.fechamentoId;
        });
    
    this.dataService.fechamentoConfMessage.subscribe(res => this.fechamento = res);
    }
    acessoEntegas(){
      this.router.navigate(['/home/entregas'])
    }

    imprimir(){
      const janela = window.open('', 'PRINT', 'height=600,width=800');
      janela.document.write('<html><head><title>NotaFechamento'+this.fechamentoId+'</title>');
      janela.document.write('</head><body>');  
      janela.document.write(document.getElementById("caixaNotaFechamento").innerHTML);
      janela.document.write('</body></html>');
      //janela.print();
      //janela.close();
    }  

}
