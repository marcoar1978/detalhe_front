import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Clinica } from '../model/clinica.model';
import { Protetico } from '../model/protetico.model';
import { DataService } from '../service/data.service';
import { Produto } from '../model/produto.model';
import { Dentista } from '../model/dentista.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, 
              private actRoute: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {
    this.dataService.altDataClinica(this.actRoute.snapshot.data['clinicas']); 
    this.dataService.altDataProtetico(this.actRoute.snapshot.data['proteticos']);
    this.dataService.altDataProduto(this.actRoute.snapshot.data['produtos']);
    this.dataService.altDataDentista(this.actRoute.snapshot.data['dentistas']);
  }

  logout(){
    window.localStorage.removeItem("tokenDetalhe");
    this.router.navigate(['/auth']);
  }

}
