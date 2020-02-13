import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

import { Entrega } from 'src/app/model/entrega.model';
import { EntregaService } from 'src/app/service/entregas.service';
import { Clinica } from 'src/app/model/clinica.model';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.component.html',
  styleUrls: ['./entregas.component.css']
})
export class EntregasComponent implements OnInit {

  entregas:Entrega[];
  entregaSelecionada:Entrega = new Entrega();
  totalEntregaSelecionada:number; 
  nomeClinicaSelecionada:string;
  clinicasComEntregas:Clinica[];
  clinicas: Clinica[];
  carregamentoClinicas:boolean = false;
  carregamentoEntregas:boolean = false;
  
  

  constructor(private entregaService: EntregaService,
              private dataService: DataService,) { }

  ngOnInit() {
    
    this.dataService.clinicaMessage
      .subscribe(res => { 
        this.clinicas = res;
        this.carregamentoClinicas = true;
        this.escondeAlert(this.carregamentoClinicas,this.carregamentoEntregas);
      });    

    this.entregaService.listaEntregas()
        .subscribe(res => {
          this.entregas = res;
          console.log(this.entregas);
          this.clinicasComEntregas = this.clinicas.filter(clinica => {
            let verifClinica:boolean = false;
            for(let i = 0; i < this.entregas.length; i++){
                 if(this.entregas[i].clinicaId == clinica.id){ 
                 verifClinica = true;
                
                };
               }
            return verifClinica;   
            });
          this.carregamentoEntregas = true;  
          this.escondeAlert(this.carregamentoClinicas,this.carregamentoEntregas);  
          
         })
    }
    
    escondeAlert(carregamentoClinicas:boolean,carregamentoPedidos:boolean ){
      
      if((carregamentoClinicas) && (carregamentoPedidos)){
        console.log(this.clinicasComEntregas); 
        $("#divAguardarDados").slideUp(350);
      }
    }

    abreModalEntrega(entregaId:number, nomeClinica:string){
        this.nomeClinicaSelecionada = nomeClinica;
        this.entregaSelecionada = this.entregas.find(entrega => entrega.id == entregaId);
        this.totalEntregaSelecionada= this.entregaSelecionada.pedidos
          .reduce((prevVal, pedido) => {return prevVal + pedido.valorLiquido },0);
          
        console.log(this.entregaSelecionada);
        console.log(this.totalEntregaSelecionada);
        setTimeout(() => {
          const janela = window.open('', 'PRINT', 'height=600,width=800');
          janela.document.write('<html><head><title>Nota de Entrega nº XX</title>');
          janela.document.write('</head><body>');  
          janela.document.write(document.getElementById("caixaNotaEntrega").innerHTML);
          janela.document.write('</body></html>');
        },500 )
        

    }  
    
    
  }


