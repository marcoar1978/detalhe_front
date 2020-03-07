import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Fechamento } from 'src/app/model/fechamento.model';

@Component({
  selector: 'app-nota-fechamento',
  templateUrl: './nota-fechamento.component.html',
  styleUrls: ['./nota-fechamento.component.css']
})
export class NotaFechamentoComponent implements OnInit, OnChanges {
 
  @Input() fechamentoSelecionadoInput:Fechamento;
  @Input() nomeClinicaInput:string;
  fechamentoSelecionado:Fechamento;
  nomeClinica:string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.fechamentoSelecionado = this.fechamentoSelecionadoInput;
    this.nomeClinica = this.nomeClinicaInput;
  }



}
