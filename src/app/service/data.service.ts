import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Clinica } from '../model/clinica.model';
import { Protetico } from '../model/protetico.model';
import { Produto } from '../model/produto.model';
import { Dentista } from '../model/dentista.model';


@Injectable({providedIn: 'root'})
export class DataService{
    clinicaSubject: BehaviorSubject<Clinica[]> = new BehaviorSubject<Clinica[]>([]);
    clinicaMessage = this.clinicaSubject.asObservable();
    proteticoSubject:  BehaviorSubject<Protetico[]> = new BehaviorSubject<Protetico[]>([]);
    proteticoMessage = this.proteticoSubject.asObservable();
    produtoSubject: BehaviorSubject<Produto[]> = new BehaviorSubject<Produto[]>([]); 
    produtoMessage = this.produtoSubject.asObservable();
    dentistaSubject: BehaviorSubject<Dentista[]> = new BehaviorSubject<Dentista[]>([]);  
    dentistaMessage = this.dentistaSubject.asObservable();

    altDataClinica(clinicas:Clinica[]){
        this.clinicaSubject.next(clinicas);
    }

    altDataProtetico(proteticos:Protetico[]){
        this.proteticoSubject.next(proteticos);
    }

    altDataProduto(produtos: Produto[]){
        this.produtoSubject.next(produtos);
    }

    altDataDentista(dentistas: Dentista[]){
        this.dentistaSubject.next(dentistas);
    }


    
}