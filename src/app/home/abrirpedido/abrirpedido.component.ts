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

  constructor(private pedidoService:PedidoService, 
              private actRoute: ActivatedRoute,
              private formBuilder: FormBuilder ) { }

  ngOnInit() {
        
    this.clinicas =  this.actRoute.snapshot.data['clinicas'];
    console.log(this.clinicas); 
    
    this.proteticos = this.actRoute.snapshot.data['proteticos'];
    console.log(this.proteticos);

    this.form = this.formBuilder.group({
      clinica: ["0", [Validators.required]],
      dentista: ["0", [Validators.required]],
    })
  }

  altClinica(){
    const clinicaId = this.form.get("clinica").value;
    $('#selDentista').slideUp(250);
    this.pedidoService.altClinica(this.pedidoId, clinicaId)
      .subscribe(res => {
           this.dentistas = res;
           $('#selDentista').slideDown(250);
         
             
      })
  }

  

}
