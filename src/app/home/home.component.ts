import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from "jquery";

import { Clinica } from '../model/clinica.model';
import { Protetico } from '../model/protetico.model';
import { DataService } from '../service/data.service';
import { Produto } from '../model/produto.model';
import { Dentista } from '../model/dentista.model';
import { DadosIniciais } from '../model/dados-iniciais.model';
import { PedidoService } from '../service/pedido.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dadosIniciais: DadosIniciais;
  verifCarregamento:boolean[] =  [false, false, false, false];

  constructor(private router: Router, 
              private actRoute: ActivatedRoute,
              private dataService: DataService,
              private pedidoService: PedidoService) { }

  ngOnInit() {
   
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

    this.dataService.altDadosIniciais(this.actRoute.snapshot.data['dadosIniciais']);
    this.dadosIniciais = this.actRoute.snapshot.data['dadosIniciais'];

  }

  escondeAlert(){
    if(!this.verifCarregamento.includes(false)){
        $("#divAguardarDados").fadeOut(500);
        this.router.navigate(['/home/inicioHome'])

    }
  }

  logout(){
    window.localStorage.removeItem("tokenDetalhe");
    this.router.navigate(['/auth']);
  }

}
