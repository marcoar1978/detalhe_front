import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from "jquery";

import { PedidoService } from 'src/app/service/pedido.service';
import { Clinica } from 'src/app/model/clinica.model';
import { Dentista } from 'src/app/model/dentista.model';
import { Protetico } from 'src/app/model/protetico.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-abrirpedido',
  templateUrl: './abrirpedido.component.html',
  styleUrls: ['./abrirpedido.component.css']
})
export class AbrirpedidoComponent implements OnInit {
  clinicas:Clinica[];
  dentistas:Dentista[];
  nomeDentista:string;
  proteticos:Protetico[];
  form:FormGroup;
  pedidoId:number=5;
  submited:boolean = false;

  constructor(private pedidoService:PedidoService, 
              private actRoute: ActivatedRoute,
              private formBuilder: FormBuilder ) { }

  ngOnInit() {
        
    this.clinicas =  this.actRoute.snapshot.data['clinicas'];
    console.log(this.clinicas); 
    
    this.proteticos = this.actRoute.snapshot.data['proteticos'];
    console.log(this.proteticos);

    this.form = this.formBuilder.group({
      clinica: ["", [Validators.required]],
      dentista: ["", [Validators.required]],
      nomePaciente: ["", [Validators.required]],
    })
  }

  altClinica(){
    const clinicaId = this.form.get("clinica").value;
    $('#divDentista').fadeOut(350);
    this.pedidoService.altClinica(this.pedidoId, clinicaId)
      .subscribe(res => {
           this.dentistas = res;
           $('#divDentista').fadeIn(350);
           }, error => {alert("Erro ao acessar o banco de dados")})
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
