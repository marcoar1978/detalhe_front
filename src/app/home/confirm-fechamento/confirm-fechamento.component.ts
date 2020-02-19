import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Fechamento } from 'src/app/model/fechamento.model';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-fechamento',
  templateUrl: './confirm-fechamento.component.html',
  styleUrls: ['./confirm-fechamento.component.css']
})
export class ConfirmFechamentoComponent implements OnInit {
  
  nomeClinica:string;
  fechamento:Fechamento;

  constructor(private dataService: DataService,
              private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.actRoute.queryParams.subscribe(queryParams => this.nomeClinica = queryParams.nomeClinica);
    this.dataService.fechamentoConfMessage.subscribe(res => this.fechamento = res);
    }

}
