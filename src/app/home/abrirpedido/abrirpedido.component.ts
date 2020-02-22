import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from "jquery";

import { PedidoService } from 'src/app/service/pedido.service';
import { Clinica } from 'src/app/model/clinica.model';
import { Dentista } from 'src/app/model/dentista.model';
import { Protetico } from 'src/app/model/protetico.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { Produto } from 'src/app/model/produto.model';
import { ItemPadrao } from 'src/app/model/itemPadrao.model';
import { AbrirPedido } from 'src/app/model/abrirPedido.model';
import { Pedido } from 'src/app/model/pedido.model';
import { ItemVariavel } from 'src/app/model/itemVariavel.model';
import { Item } from 'src/app/model/item.model';
import { PedidoFechado } from 'src/app/model/pedido-fechado.model';


@Component({
  selector: 'app-abrirpedido',
  templateUrl: './abrirpedido.component.html',
  styleUrls: ['./abrirpedido.component.css']
})
export class AbrirpedidoComponent implements OnInit {
  pedido:Pedido = new Pedido();
  clinicas:Clinica[];
  dentistas:Dentista[];
  dentistasForm:Dentista[];
  produtos:Produto[];
  produtosPadraoClinica:Produto[];
  produtosEscolhidos:Produto[] = [];
  nomeDentista:string;
  proteticos:Protetico[];
  form:FormGroup;
  aberturaPedido:AbrirPedido;;
  submited:boolean = false;
  options:number[] = [];
  optionsDesconto:number[] = [];
  desconto:number = 0;
  valorDesconto:number;
  valorTotalLiquido:number;
  totalPedido:number = 0;
  msgFormItem:string;
  recebeConfPedido:boolean = false;
  ordem:number = 1
      
  constructor(private pedidoService:PedidoService, 
              private actRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private dataService: DataService,
              private router: Router ) { }

  ngOnInit() {
    this.aberturaPedido = this.actRoute.snapshot.data['aberturaPedido'];
    this.aberturaPedido.prazo =7;
    this.dataService.clinicaMessage.subscribe(res => { this.clinicas = res });     
    this.dataService.proteticoMessage.subscribe(res => { this.proteticos = res });
    this.dataService.produtoMessage.subscribe(res => { this.produtos = res });
    this.dataService.dentistaMessage.subscribe(res => { this.dentistas = res });
    
    for(let i=1;i<=100;i++){
      this.options.push(i);
    }

    for(let i=0; i<=100; i = i + 5){
      this.optionsDesconto.push(i);
    }

    this.form = this.formBuilder.group({
      clinica: ["", [Validators.required]],
      dentista: ["", [Validators.required]],
      nomePaciente: ["", [Validators.required]],
      tipoProduto: ["padrao"],
      produtoPadrao: [""],
      qdeProduto: [1],
      tipoVariavel:[""],
      descProdVariavel:[],
      protetico:["", [Validators.required]],
      desconto:["0"],
      obs:[],
      dataPedido:[this.aberturaPedido.dataPedido],
      valorProdVariavel:[],
    })
    $("#tdValorProdVariavel").hide();
    
  }

  altClinica(){
    const clinicaId = this.form.get("clinica").value;
    this.produtosEscolhidos = [];
    this.valorTotalLiquido = 0;
    this.valorDesconto = 0;
    this.totalPedido = 0;
    
    this.produtosPadraoClinica = this.produtos.filter(produtoPadraoClinica => produtoPadraoClinica.clinicaId == clinicaId)
    $('#caixaItens').fadeOut(350);
    $('#divDentista').slideUp(350, () => {
      this.dentistasForm = this.dentistas.filter(dentista => dentista.clinicaId == clinicaId);
     
      $('#divDentista').slideDown(350);
      $('#caixaItens').fadeIn(350);
    });

   this.pedidoService.delItensPorProduto(this.aberturaPedido.pedidoId)
      .subscribe(res => res, error => {alert("Erro ao acessar o banco de dados")})

  }

  altDentista(){
    const dentistaId = this.form.get("dentista").value;
    //this.pedidoService.altDentista(this.aberturaPedido.pedidoId,dentistaId)
    //  .subscribe(res => {}, error => {alert("Erro ao acessar o banco de dados")})
  }

  altNomePaciente(){
    if(!this.form.get("nomePaciente").hasError("required")){
      const nomePaciente = this.form.get("nomePaciente").value;
     // this.pedidoService.altNomePaciente(this.aberturaPedido.pedidoId, nomePaciente)
      //  .subscribe(res => {}, error => {alert("Erro ao acessar o banco de dados")})
    }
  }

  altProtetico(){
    const proteticoId =  this.form.get("protetico").value;
   // this.pedidoService.altProtetico(this.aberturaPedido.pedidoId, proteticoId)
    //  .subscribe(res => res, error => {alert("Erro ao acessar o banco de dados")})

  }

  altDesconto(){
    this.desconto = this.form.get('desconto').value;
    this.valorDesconto = (this.totalPedido * this.desconto)/100;
    this.valorTotalLiquido = this.totalPedido - this.valorDesconto;
    this.pedidoService.altDesconto(this.aberturaPedido.pedidoId, this.desconto)
       .subscribe(res => res, error => {alert("Erro ao acessar o banco de dados")});
  }

  mostraFormProdutoPadrao(){
    $("#divProduto").slideUp(350, () => {
      $("#selProdutoPadrao").show();
      $("#tdSelTipoProdutoVariavel").hide();
      $("#selTipoProdutoVariavel").hide();
      $("#tdValorProdVariavel").hide();
      $("#valorProdVariavel").hide();
      $("#descProdVariavel").hide();
      $("#divProduto").slideDown(350);
    });
  }

  mostraFormProdutoVariavel(){
    $("#divProduto").slideUp(350, () => {
      $("#selProdutoPadrao").hide();
      $("#tdSelTipoProdutoVariavel").show();
      $("#selTipoProdutoVariavel").show();
      $("#tdValorProdVariavel").show();
      $("#valorProdVariavel").show();
      $("#descProdVariavel").show();
      $("#divProduto").slideDown(350);

    });
  }

  submitForm(){
      this.submited = true;
      if(!this.form.invalid){
        this.desconto = this.form.get('desconto').value;
        this.valorDesconto = (this.totalPedido * this.desconto)/100;
        this.valorTotalLiquido = this.totalPedido - this.valorDesconto;
        let pedidoFechado:PedidoFechado = new PedidoFechado();
        pedidoFechado.pedidoId = this.aberturaPedido.pedidoId;
        pedidoFechado.clinicaId = Number(this.form.get("clinica").value);
        pedidoFechado.dentistaId = Number(this.form.get("dentista").value);
        pedidoFechado.nomePaciente = this.form.get("nomePaciente").value;
        pedidoFechado.proteticoId = Number(this.form.get("protetico").value);
        pedidoFechado.desconto = Number(this.desconto);
        pedidoFechado.dataPedido = this.form.get('dataPedido').value;
        pedidoFechado.dataCad = this.aberturaPedido.dataPedido;
        pedidoFechado.obs = this.form.get('obs').value;
        pedidoFechado.prazo = this.aberturaPedido.prazo;
        pedidoFechado.valorTotal = this.totalPedido;
        pedidoFechado.valorLiquido = this.valorTotalLiquido;
               
      
        this.pedidoService.conferirPedido(pedidoFechado)
          .subscribe(res => {
                this.pedido = res;
                this.pedido.dataPedido = this.aberturaPedido.dataPedido;
                this.dataService.altDataPedidoFechado(this.pedido);
                this.recebeConfPedido = true;
                            
              }, error => {alert("Erro ao acessar o banco de dados")})
          

        $('#titulo').fadeOut(350);
        $('#selClinica').fadeOut(350);
        $('#selDentista').fadeOut(350);
        $('#nomePaciente').fadeOut(350);
        $('#selProtetico').fadeOut(350);
        $('#desconto').fadeOut(350);
        $('#edit').fadeOut(350);
        $('#camposObsDatas').fadeOut(350);        
        $('#caixaItens').fadeOut(350, () => {
          $("#conferenciaPedido").fadeIn(350);
        }) 
        
        $('#divBotaoContinuar').fadeOut(350, () => {
          $("#divBotaoFechar").fadeIn(350);
        })
      }
  }

  voltarForm(){
    this.recebeConfPedido = false;
    $('#titulo').fadeIn(350);
    $('#selClinica').fadeIn(350);
    $('#selDentista').fadeIn(350);
    $('#nomePaciente').fadeIn(350);
    $('#selProtetico').fadeIn(350);
    $('#desconto').fadeIn(350);
    $('#edit').fadeIn(350);

    $("#conferenciaPedido").fadeOut(350,() => {
      $('#caixaItens').fadeIn(350);
    });

    $("#divBotaoFechar").fadeOut(350, () => {
      $('#divBotaoContinuar').fadeIn(350);
    });

  }

  resetAvisoForm(){
    this.submited = false;
    $(".avisoForm").slideUp(500);
  }

  resetAvisoFormItem(){
    this.submited = false;
    $("#avisoFormItem").slideUp(350);
  }

  inserirProduto(){
    if(this.form.get('tipoProduto').value == "padrao"){
      this.inserirProdutoPadrao();
    }
    else{
      this.inserirProdutoVariavel();
    }
  }

  inserirProdutoPadrao(){
    const produtoId = this.form.get('produtoPadrao').value;
    const clinicaId = this.form.get('clinica').value;
    if(!(produtoId) || !(this.form.get('qdeProduto').value)){
      this.msgFormItem = "Todos os dados o Ítem devem ser preenchidos";
        $('#avisoFormItem').slideDown(350);
        return;
      }
    
    const produtosEscolhidosPadrao =  this.produtosEscolhidos.filter(produtoEscolhido => produtoEscolhido.tipoProduto == "padrao"); 
    const verificaProdutoRepetido = produtosEscolhidosPadrao.filter(produtoEscolhido => produtoEscolhido.produtoId == produtoId);
    if(verificaProdutoRepetido.length == 1){
      this.msgFormItem = "Produto já foi inserido";
      $('#avisoFormItem').slideDown(350);
      return;
    }  
   
    const produtoPadrao:Produto = this.produtos.find(produto => (produto.clinicaId == clinicaId && produto.produtoId == produtoId));
    produtoPadrao.qde = this.form.get('qdeProduto').value;
    produtoPadrao.valorTotal = produtoPadrao.valor * produtoPadrao.qde;
    produtoPadrao.ordem = this.ordem;
    produtoPadrao.tipoProduto = "padrao"; 
    $('#tabelaItens').fadeOut(350, () => {
      this.produtosEscolhidos.push(produtoPadrao);
      this.totalPedido = this.produtosEscolhidos
        .reduce((prevVal, produtoEscolhido) => {return prevVal + produtoEscolhido.valorTotal },0);
      this.valorDesconto = (this.totalPedido * this.desconto)/100;
      this.valorTotalLiquido = this.totalPedido - this.valorDesconto;
      let produtoVerifPrazo = this.produtosEscolhidos.filter(produtoEscolhido => produtoEscolhido.padraoPrazoEntrega == 10);
      this.aberturaPedido.prazo = (produtoVerifPrazo.length > 0) ? 10 : 7;
      $('#tabelaItens').fadeIn(350);
      })
  
  let item:Item = new Item();
  item.pedidoId = this.aberturaPedido.pedidoId;
  item.tipoProduto = produtoPadrao.tipoProduto;
  item.produtoId = produtoPadrao.produtoId;
  item.ordem = this.ordem;
  this.ordem++; 
  item.descricao = produtoPadrao.nome;   
  item.qde = produtoPadrao.qde;
  item.valorUnitario = produtoPadrao.valor;
  item.valorTotal = produtoPadrao.valorTotal;
  this.pedidoService.addItem(item)
    .subscribe(res => res, error => alert("Erro ao cadastrar o ítem"));    
    
  
  }

  inserirProdutoVariavel(){
      const descProdVariavel = this.form.get('descProdVariavel').value;
      const valorProdVariavel = this.form.get('valorProdVariavel').value;
      const qdeProduto = this.form.get('qdeProduto').value;
      const tipoVariavel = this.form.get('tipoVariavel').value;
      if((!descProdVariavel) || (!valorProdVariavel) || (!qdeProduto) || (!tipoVariavel)){
        this.msgFormItem = "Todos os dados o Ítem devem ser preenchidos";
         $('#avisoFormItem').slideDown(350);
          return;
        }
    
      this.form.get('descProdVariavel').setValue("");
      this.form.get('valorProdVariavel').setValue("");
      this.form.get('qdeProduto').setValue(1);
      this.form.get('tipoVariavel').setValue("");    


     let produtoVariavel:Produto = new Produto();
     produtoVariavel.clinicaId = this.form.get('clinica').value;
     produtoVariavel.tipoProduto = "variavel";
     produtoVariavel.nome = descProdVariavel;
     produtoVariavel.ordem = this.ordem;
     produtoVariavel.produtoId = tipoVariavel;
     produtoVariavel.qde = qdeProduto;
     produtoVariavel.valor = valorProdVariavel;
     produtoVariavel.valorTotal = produtoVariavel.valor * produtoVariavel.qde;  
     
     $('#tabelaItens').fadeOut(350, () => {
      this.produtosEscolhidos.push(produtoVariavel);
      this.totalPedido = this.produtosEscolhidos
        .reduce((prevVal, produtoEscolhido) => {return prevVal + produtoEscolhido.valorTotal },0);
      this.valorDesconto = (this.totalPedido * this.desconto)/100;
      this.valorTotalLiquido = this.totalPedido - this.valorDesconto;
      $('#tabelaItens').fadeIn(350);
      })

      let item:Item = new Item();

      item.pedidoId = this.aberturaPedido.pedidoId;
      item.tipoProduto = produtoVariavel.tipoProduto;
      item.produtoId = Number(tipoVariavel);
      item.ordem = this.ordem;
      this.ordem++;
      item.descricao = descProdVariavel;
      item.qde = produtoVariavel.qde;
      item.valorUnitario = valorProdVariavel;
      item.valorTotal = produtoVariavel.valor * produtoVariavel.qde;  
    
      this.pedidoService.addItem(item)
        .subscribe(res => res, error => alert("Erro ao cadastrar o ítem"));
   }  


deleteItem(produtoId, ordem){

  this.produtosEscolhidos = this.produtosEscolhidos.filter(produtoEscolhido => produtoEscolhido.produtoId != produtoId);
  this.totalPedido = this.produtosEscolhidos
        .reduce((prevVal, produtoEscolhido) => {return prevVal + produtoEscolhido.valorTotal },0);
  this.valorDesconto = (this.totalPedido * this.desconto)/100;
  this.valorTotalLiquido = this.totalPedido - this.valorDesconto;      
  let produtoVerifPrazo = this.produtosEscolhidos.filter(produtoEscolhido => produtoEscolhido.padraoPrazoEntrega == 10);
  this.aberturaPedido.prazo = (produtoVerifPrazo.length > 0) ? 10 : 7;
  
    $("#padrao_"+produtoId).hide();
    this.pedidoService.delItem(this.aberturaPedido.pedidoId, ordem)
    .subscribe(res => res, error => error => alert("Erro ao deletar o ítem"))
 

}

mostrarCampoObs(){
  $('#camposObsDatas').slideToggle(350);
}

altObs(){
  const obs = this.form.get('obs').value;
  this.pedidoService.altObs(this.aberturaPedido.pedidoId, obs)
    .subscribe(res => res, error => alert("Erro ao inserir a observação") );
}

altDataPedido(){
   //this.pedidoService.altDataPedido(this.aberturaPedido.pedidoId, this.form.get('dataPedido').value,this.aberturaPedido.prazo)
   //.subscribe(res => res, error => alert("Erro ao inserir a observação") );
}

scaleEditMouseOver(e){
 
  $("#edit").animate({width: '60'}, 350);
 
}

fecharPedido(){
  this.router.navigate(['home/pedidoFechado', this.aberturaPedido.pedidoId.toString()]);
     
}

imprimir(){
  const janela = window.open('', 'PRINT', 'height=400,width=700');
  janela.document.write('<html><head><title>Pedido nº '+this.aberturaPedido.pedidoId+'</title>');
  janela.document.write('</head><body>');  
  janela.document.write(document.getElementById("conferenciaPedido").innerHTML);
  janela.document.write('</body></html>');
  janela.print();
  janela.close();
}


}
