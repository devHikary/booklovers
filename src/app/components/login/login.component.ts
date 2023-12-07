import { Route } from '../../models/Route';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { LocalService } from 'src/app/services/local.service';
import { LoginService } from 'src/app/services/login.service';
import { Login } from 'src/app/models/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  loginObj:Login =new Login();
  public isLogin: boolean = false;
  public closeResult: string = '';

  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public signupForm = new FormGroup({
    name_snp: new FormControl('', [Validators.required]),
    email_snp: new FormControl('', [Validators.required]),
    username_snp: new FormControl('', [Validators.required]),
    password_snp: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private userService: UserService,
    private localService: LocalService,
    private loginService: LoginService,
  ){}

  ngOnInit(): void {
    this.localService.clearStorage();
  }

  get username(){
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }

  get password_snp(){
    return this.signupForm.get('password_snp');
  }
  get username_snp(){
    return this.signupForm.get('username_snp');
  }

  get email_snp(){
    return this.signupForm.get('email_snp');
  }

  get name_snp(){
    return this.signupForm.get('name_snp');
  }

  get role_id_snp(){
    return this.signupForm.get('role_id_snp');
  }

  getLogin(){
    this.loginObj.username = this.loginForm.value.username;
    this.loginObj.password = this.localService.encryptPWD(this.loginForm.value.password);
    const de = this.localService.decrypt(this.loginObj.password);

  }

  login(){
    if(this.loginForm.invalid)
      return;

    this.getLogin();

    this.loginService.auth(this.loginObj).subscribe((response: any) =>{
      console.log(response);
      this.localService.saveToken(response['token'])

      this.router.navigate(['/booklovers/explorer']);

      const payload = this.localService.decodePayloadJWT(response['token']);
      this.localService.saveData("bS", JSON.stringify(payload['permissions']));
      this.localService.saveData("id", JSON.stringify(payload['id']));

      console.log(payload['permissions']);
    })

  }

  cancel(){
    this.isLogin = false;
  }

  toggleLogin(){
    this.isLogin = true;
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed`;
        }
      );
  }

  getUser(){
    this.user.name = this.signupForm.value.name_snp!;
    this.user.email = this.signupForm.value.email_snp!;
    this.user.username = this.signupForm.value.username_snp!;
    this.user.password = this.localService.encryptPWD(this.signupForm.value.password_snp!);
    this.user.role_id = "6ccc7600-ded8-4676-8b05-8f28cad4b028";
    console.log(this.user)
  }

  saveUser(modal: any){
    if (this.signupForm.invalid) {
      return;
    }


    this.getUser();

    this.userService.add(this.user).subscribe(
      (response) => {
        Swal.fire({
          title: 'Salvo',
          text: 'Registro salvo com sucesso',
          icon: 'success',
          timer: 2000,
        });
        modal.close('savepwd');
        this.signupForm.reset();
      },
      (e) => {
        Swal.fire({
          title: 'Erro!',
          text: e.error.error,
          icon: 'error',
          timer: 2000,
        });
      }
    );
  }
}
