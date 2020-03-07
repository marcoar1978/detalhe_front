import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Entrega } from 'src/app/model/entrega.model';

@Component({
  selector: 'app-nota-entrega',
  templateUrl: './nota-entrega.component.html',
  styleUrls: ['./nota-entrega.component.css']
})
export class NotaEntregaComponent implements OnInit, OnChanges {

  @Input() entregaSelecionadaInput: Entrega;
  @Input() nomeClinicaInput: string;
  entregaSelecionada: Entrega;
  nomeClinica: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.entregaSelecionada = this.entregaSelecionadaInput;
    this.nomeClinica = this.nomeClinicaInput;
  }

}
