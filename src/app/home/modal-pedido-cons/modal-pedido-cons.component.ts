import { Component, OnInit, Input } from '@angular/core';
import { Pedido } from 'src/app/model/pedido.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-pedido-cons',
  templateUrl: './modal-pedido-cons.component.html',
  styleUrls: ['./modal-pedido-cons.component.css']
})
export class ModalPedidoConsComponent implements OnInit {

  @Input() pedidoSelecionado:Pedido;
  constructor() { }

  ngOnInit() {
  }

}
