import { Component, OnInit, OnChanges } from '@angular/core';
import * as $ from "jquery";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DataService } from 'src/app/service/data.service';
import { Clinica } from 'src/app/model/clinica.model';
import { DadosIniciais } from 'src/app/model/dados-iniciais.model';
import { Pedido } from 'src/app/model/pedido.model';
import { PedidoService } from 'src/app/service/pedido.service';

@Component({
  selector: 'app-consulta-pedidos',
  templateUrl: './consulta-pedidos.component.html',
  styleUrls: ['./consulta-pedidos.component.css']
})
export class ConsultaPedidosComponent implements OnInit {

  formExpandido:boolean = false;
  labelButtonForm:string = "Expandir";
  clinicas:Clinica[];
  dadosIniciais:DadosIniciais;
  pedido:Pedido;
  pedidos:Pedido[];
  form:FormGroup;

  constructor(private dataService: DataService,
              private formBuilder: FormBuilder,
              private pedidoService:PedidoService) { }

  ngOnInit() {


    this.dataService.clinicaMessage
      .subscribe(res => { 
        this.clinicas = res;
       });
    
    this.dataService.dadosIniciaisMessage
      .subscribe(res => { this.dadosIniciais = res})   
    
  }
 
  expandeFormConsulta() {
        
    if(this.formExpandido == false){
      $("#divFormConsulta").animate({width: "680px"}, 200, "linear", () => {
        $("#divFormConsulta").animate({height: "280px"}, 
        { complete: () => { 
          $("#formConsulta").fadeIn(250); 
          $("#divFormConsulta").css('box-shadow','10px 10px 10px -6px rgba(0,0,0,0.75)');
          $("#pedidoId").focus();
         }})
        }
     );
    }

    if(this.formExpandido == true){
      $("#formConsulta").fadeOut(250, () => {
        $("#divFormConsulta").animate({height: "55px"},  () => {
          $("#divFormConsulta").animate({width: "110px"}, 200, "linear");
          $("#divFormConsulta").css('box-shadow','');
      })  
    });
  }
  
  if(this.formExpandido) {
    this.formExpandido = false;
    this.labelButtonForm = "Expandir";
    }
  else{ 
    this.formExpandido = true;
    this.labelButtonForm = "Reduzir";
  }  
  }

  valueMesAno(){
    console.log($("#mesAno").val());
  }

  consultaPorId(){
    let pedidoId = $("#pedidoId").val();
    if(!pedidoId){
      alert("Digite o número do pedido");
      return;
    }
    this.pedidoService.consultaPorId(pedidoId)
      .subscribe(res => {
        this.pedido = res;
        console.log(this.pedido);
        this.escondeDivConsulta();
      })
  
  }

  escondeDivConsulta(){
    $("#formConsulta").fadeOut(250, () => {
      $("#divFormConsulta").animate({height: "55px"},  () => {
        $("#divFormConsulta").animate({width: "110px"}, 200, "linear");
        $("#divFormConsulta").css('box-shadow','');
    })  
  });
  }

}
