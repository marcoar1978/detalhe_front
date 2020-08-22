import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as $ from "jquery";
import { API } from '../../environments/api';

import { LoginService } from '../service/login.service';
import { JWT } from '../model/Jwt.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  submited: boolean = false;
  mostraMsgErro: boolean = false;
  email: string;
  senha: string;
  msg: string;
  credencial: JWT;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    console.log(`Versão: 21.08.2020 - API: ${API}`)
    this.formLogin = this.formBuilder.group({
      email: ["", [Validators.required]],
      senha: ["", [Validators.required]]
    });
  }

  submitForm() {
    this.submited = true;
    if (!this.formLogin.invalid) {
      $("#caixaMsgErro").slideUp(500, () => {
        $("#caixaMsgAguardar").slideDown(500);
      })

      this.email = this.formLogin.get("email").value;
      this.senha = this.formLogin.get("senha").value;

      this.loginService.autenticar(this.email, this.senha)
        .subscribe(res => {
          this.credencial = res;
          window.localStorage.setItem("tokenDetalhe", this.credencial.token);
          this.router.navigate(['/home']);
        }, err => {
          this.submited = false;
          $("#caixaMsgAguardar").slideUp(500, () => {
            $("#caixaMsgErro").slideDown(500);
          });

        });
    }
  }

  resetForm() {
    this.submited = false;
    //this.mostraMsgErro = false;
    $("#caixaMsgErro").slideUp(500);
  }

}

