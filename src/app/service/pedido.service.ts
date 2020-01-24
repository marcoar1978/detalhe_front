import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clinica } from '../model/clinica.model';
import { Protetico } from '../model/protetico.model';

@Injectable({providedIn: 'root'})
export class PedidoService{
    API:string = "http://ec2-54-82-227-244.compute-1.amazonaws.com";
    clinicas:Clinica[];
    proteticos:Protetico[];

    constructor(private http: HttpClient){}

    getClinicas(): Observable<Clinica[]>{
        return this.http.get<Clinica[]>(this.API +'/clinicas');
    }

    getProteticos(): Observable<Protetico[]>{
        return this.http.get<Protetico[]>(this.API +'/proteticos');
    }

    
}