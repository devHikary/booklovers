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
import { HeaderService } from 'src/app/services/header.service';
import { ToastService } from 'src/app/services/toast.service';
import { auth } from 'src/app/services/firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  User as UserGoogle,
} from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = new User();
  userGg: User = new User();
  loginObj: Login = new Login();
  loginObjgg: Login = new Login();
  public isLogin: boolean = false;
  public isError: boolean = false;
  public closeResult: string = '';
  verifyGg: string = '';

  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public signupForm = new FormGroup({
    name_snp: new FormControl('', [Validators.required]),
    email_snp: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}'),
    ]),
    username_snp: new FormControl('', [Validators.required]),
    password_snp: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])[0-9a-zA-Z\\W_]{8,}'
      ),
    ]),
  });

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private userService: UserService,
    private localService: LocalService,
    private loginService: LoginService,
    private headerService: HeaderService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.localService.clearStorage();
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get password_snp() {
    return this.signupForm.get('password_snp');
  }
  get username_snp() {
    return this.signupForm.get('username_snp');
  }

  get email_snp() {
    return this.signupForm.get('email_snp');
  }

  get name_snp() {
    return this.signupForm.get('name_snp');
  }

  get role_id_snp() {
    return this.signupForm.get('role_id_snp');
  }

  getLogin() {
    this.loginObj.username = this.loginForm.value.username;
    this.loginObj.password = this.localService.encryptPWD(
      this.loginForm.value.password
    );
  }

  login() {
    this.isError = false;
    this.headerService.updateGoogle(false);
    if (this.loginForm.invalid) return;

    this.getLogin();

    this.loginService.auth(this.loginObj).subscribe(
      (response: any) => {
        this.authorizedUser(response);
      },
      (err) => {
        this.isError = true;
        this.toastService.show('Atenção! Usuário ou senha incorreta', {
          classname: 'bg-danger text-light',
        });
      }
    );
  }

  authorizedUser(response: any) {
    this.localService.saveToken(response['token']);
    this.headerService.updateToggle(true);
    this.headerService.updateUser(this.loginObj.username);
    this.router.navigate(['/booklovers/explorer']);

    const payload = this.localService.decodePayloadJWT(response['token']);
    this.localService.saveData('bS', JSON.stringify(payload['permissions']));
    this.localService.saveData('id', JSON.stringify(payload['id']));
    this.localService.saveData('username', JSON.stringify(payload['username']));
  }

  cancel() {
    this.isLogin = false;
  }

  toggleLogin() {
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

  getUser() {
    this.user.name = this.signupForm.value.name_snp!;
    this.user.email = this.signupForm.value.email_snp!;
    this.user.username = this.signupForm.value.username_snp!;
    this.user.password = this.localService.encryptPWD(
      this.signupForm.value.password_snp!
    );
    this.user.role_id = '6ccc7600-ded8-4676-8b05-8f28cad4b028';
  }

  saveUser(modal: any) {
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

  signInWithGoogle() {
    this.isError = false;
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        this.userGg.name = result.user.displayName;
        this.userGg.password = result.user.uid;
        this.userGg.email = result.user.email;
        var userAux = result.user.email.split('@');
        this.userGg.username = userAux[0];
        this.userGg.role_id = '6ccc7600-ded8-4676-8b05-8f28cad4b028';

        this.loginObjgg.password = this.userGg.password;
        this.loginObjgg.username = this.userGg.username;

        this.userService.add(this.userGg).subscribe(
          (response: any) => {
            this.isError = false;
            this.verifyGg = response.msg;
            this.authGg();
          },
          (e) => {
            this.verifyGg = e.error.error;
            this.authGg();
          }
        );
      })
      .catch((error) => {
        this.isError = true;
        this.toastService.show('Atenção! Usuário ou senha incorreta', {
          classname: 'bg-danger text-light',
        });
      });
  }

  authGg(){
    if (
      this.verifyGg == 'E-mail já cadastrado' ||
      this.verifyGg == 'Registro criado'
    ) {
      this.loginService.auth(this.loginObjgg).subscribe(
        (response: any) => {
          this.authorizedUser(response);
          this.headerService.updateGoogle(true);
        },
        (err) => {
          this.isError = true;
          this.toastService.show('Atenção! Usuário ou senha incorreta', {
            classname: 'bg-danger text-light',
          });
        }
      );
    }
  }

}
