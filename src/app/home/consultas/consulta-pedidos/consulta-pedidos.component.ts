import { Component, OnInit, OnChanges } from '@angular/core';
import * as $ from "jquery";
import { DataService } from 'src/app/service/data.service';

import { Clinica } from 'src/app/model/clinica.model';

@Component({
  selector: 'app-consulta-pedidos',
  templateUrl: './consulta-pedidos.component.html',
  styleUrls: ['./consulta-pedidos.component.css']
})
export class ConsultaPedidosComponent implements OnInit {

  formExpandido:boolean = false;
  labelButtonForm:string = "Expandir";
  clinicas:Clinica[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.clinicaMessage
      .subscribe(res => { 
        this.clinicas = res;
       });
    
  }
 
  expandeFormConsulta(){
        
    if(this.formExpandido == false){
       $("#divFormConsulta").animate({height: "380px"},
       { complete: () => { 
         $("#formConsulta").fadeIn(350); 
         $("#divFormConsulta").css('box-shadow','10px 10px 10px -6px rgba(0,0,0,0.75)');
        }});
    }

    if(this.formExpandido == true){
      $("#formConsulta").fadeOut(350, () => {
        $("#divFormConsulta").animate({height: "55px"});
        $("#divFormConsulta").css('box-shadow','');
      })

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

}
