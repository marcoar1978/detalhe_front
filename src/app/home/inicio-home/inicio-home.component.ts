import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

import { PedidoService } from 'src/app/service/pedido.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-inicio-home',
  templateUrl: './inicio-home.component.html',
  styleUrls: ['./inicio-home.component.css']
})
export class InicioHomeComponent implements OnInit {

  verifCarregamento:boolean[] =  [false, false, false, false];
  verifDadosPrincipais:boolean;
  labelAbrirPedido:string = "Abrir Pedido";
  disabledAbrirPedido:boolean = false;

  constructor(private pedidoService:PedidoService,
              private dataService: DataService) { }

  ngOnInit() {
    this.dataService.verifDadosPrincipaisMessage
    .subscribe(dadosPrincipais => {
        this.verifDadosPrincipais = dadosPrincipais
        this.escondeAlertInicial();
    });


    setTimeout( () => {
      if(!this.verifDadosPrincipais){
        this.pedidoService.getClinicas()
        .subscribe(clinicas => {
          this.dataService.altDataClinica(clinicas);
          this.verifCarregamento[0] = true;
          this.escondeAlert();   
        }, error => {alert("Erro ao acessar o banco de dados")});
      
      this.pedidoService.getProteticos()
        .subscribe(proteticos => {
          this.dataService.altDataProtetico(proteticos);
          this.verifCarregamento[1] = true;
          this.escondeAlert();   
        }, error => {alert("Erro ao acessar o banco de dados")})
        
      this.pedidoService.detPrecos()
        .subscribe(produtos => {
          this.dataService.altDataProduto(produtos);
          this.verifCarregamento[2] = true;
          this.escondeAlert();   
        }, error => {alert("Erro ao acessar o banco de dados")});
      
      this.pedidoService.getDentistas()
        .subscribe(dentistas => {
          this.dataService.altDataDentista(dentistas);
          this.verifCarregamento[3] = true;
          this.escondeAlert(); 
        }, error => {alert("Erro ao acessar o banco de dados")})  
      }
  
      this.dataService.altDataDadosPrincipais(true);
    }, 300)
    
  }

  escondeAlert(){
    if(!this.verifCarregamento.includes(false)){
        $("#divAguardarDados").fadeOut(500, () => {
          $("#menu").fadeIn(500);
        });
    }
  }

  escondeAlertInicial(){
    if(this.verifDadosPrincipais){
        $("#divAguardarDados").fadeOut(500, () => {
          $("#menu").fadeIn(500);
        });
    }
  }

  abrirPedido(){
    this.disabledAbrirPedido = true;
    this.labelAbrirPedido = "Aguarde um momento";
  }

}
