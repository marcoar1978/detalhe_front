import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from "jquery";

import { PedidoService } from 'src/app/service/pedido.service';
import { Clinica } from 'src/app/model/clinica.model';
import { Dentista } from 'src/app/model/dentista.model';
import { Protetico } from 'src/app/model/protetico.model';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { Produto } from 'src/app/model/produto.model';


@Component({
  selector: 'app-abrirpedido',
  templateUrl: './abrirpedido.component.html',
  styleUrls: ['./abrirpedido.component.css']
})
export class AbrirpedidoComponent implements OnInit {
  clinicas:Clinica[];
  dentistas:Dentista[];
  dentistasForm:Dentista[];
  produtos:Produto[];
  nomeDentista:string;
  proteticos:Protetico[];
  form:FormGroup;
  pedidoId:number=5;
  submited:boolean = false;
  
  constructor(private pedidoService:PedidoService, 
              private actRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private dataService: DataService ) { }

  ngOnInit() {
    this.dataService.clinicaMessage.subscribe(res => { this.clinicas = res });     
    this.dataService.proteticoMessage.subscribe(res => { this.proteticos = res });
    this.dataService.produtoMessage.subscribe(res => { this.produtos = res });
    this.dataService.dentistaMessage.subscribe(res => { this.dentistas = res });

    this.form = this.formBuilder.group({
      clinica: ["", [Validators.required]],
      dentista: ["", [Validators.required]],
      nomePaciente: ["", [Validators.required]],
    })
  }

  altClinica(){
    console.log(this.dentistas);
    const clinicaId = this.form.get("clinica").value;
    $('#caixaItens').fadeOut(350);
    $('#divDentista').slideUp(350, () => {
      this.dentistasForm = this.dentistas.filter(dentista => dentista.clinicaId == clinicaId);
      console.log(this.dentistasForm)
      $('#divDentista').slideDown(350);
      $('#caixaItens').fadeIn(350);
    });

   this.pedidoService.altClinica(this.pedidoId, clinicaId)
      .subscribe(res => res, error => {alert("Erro ao acessar o banco de dados")})


  }

  altDentista(){
    const dentistaId = this.form.get("dentista").value;
    this.pedidoService.altDentista(this.pedidoId,dentistaId)
      .subscribe(res => {}, error => {alert("Erro ao acessar o banco de dados")})
  }

  altNomePaciente(){
    console.log("Blur ok");
    if(!this.form.get("nomePaciente").hasError("required")){
      const nomePaciente = this.form.get("nomePaciente").value;
      this.pedidoService.altNomePaciente(this.pedidoId, nomePaciente)
        .subscribe(res => {}, error => {alert("Erro ao acessar o banco de dados")})
    }
    

  }

  submitForm(){
      this.submited = true;
  }

  resetAvisoForm(){
    this.submited = false;
    $(".avisoForm").slideUp(500);
  }

  

}
