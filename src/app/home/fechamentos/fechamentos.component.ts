import { Component, OnInit } from '@angular/core';
import { FechamentoService } from 'src/app/service/fechamento.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as $ from "jquery";

import { DataService } from 'src/app/service/data.service';
import { DadosIniciais } from 'src/app/model/dados-iniciais.model';
import { Fechamento } from 'src/app/model/fechamento.model';
import { Clinica } from 'src/app/model/clinica.model';

@Component({
  selector: 'app-fechamentos',
  templateUrl: './fechamentos.component.html',
  styleUrls: ['./fechamentos.component.css']
})
export class FechamentosComponent implements OnInit {
  
  dadosIniciais:DadosIniciais;
  fechamentos:Fechamento[];
  clinicas:Clinica[];
  clinicasComFechamento:Clinica[];
  carregamentoClinicas:boolean;
  carregamentoFechamentos:boolean;

  constructor(private fechamentoService: FechamentoService,
    private modalService: NgbModal,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit() {
    this.dataService.dadosIniciaisMessage.subscribe(res => this.dadosIniciais = res);

    this.dataService.clinicaMessage
      .subscribe(res => { 
        this.clinicas = res;
        console.log(this.clinicas);
        this.carregamentoClinicas = true;
       this.escondeAlert();
      });

      this.fechamentoService.listaFechamentos()
        .subscribe(res => {
          this.fechamentos = res;
          
          console.log(this.fechamentos);
          this.clinicasComFechamento = this.clinicas.filter(clinica => {
            let verifClinicaComFechamento = false;
            for(let i = 0; i < this.fechamentos.length; i++){
              if(this.fechamentos[i].clinicaId == clinica.id){
                verifClinicaComFechamento = true;
              }
            }
            return verifClinicaComFechamento;
          })
          console.log(this.clinicasComFechamento);
          this.carregamentoFechamentos = true;
          this.escondeAlert();
        })
  }

  escondeAlert(){
      
    if((this.carregamentoClinicas) && (this.carregamentoFechamentos)){
      $("#divAguardarDados").slideUp(350);
    }
  }

}
