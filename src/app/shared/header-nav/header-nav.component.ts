import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/User';
import { HeaderService } from 'src/app/services/header.service';
import { LocalService } from 'src/app/services/local.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css'],
})
export class HeaderNavComponent implements OnInit {
  user: User = new User();
  user_id: string = '';
  isMenuCollapsed = true;
  usernameLabel: string = '';
  closeResult: string = '';

  isShowHeader: boolean = false;
  isAdm: boolean = false;

  public userForm = new FormGroup({
    name_user: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
  });

  constructor(
    private localService: LocalService,
    private router: Router,
    private headerService: HeaderService,
    private modalService: NgbModal,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.user_id = this.localService.getUserId();
    this.headerService.data.subscribe((arg: boolean) => {
      this.isShowHeader = arg;
    });

    this.headerService.dataAdm.subscribe((arg: boolean) => {
      this.isAdm = arg;
    });

    this.headerService.dataUser.subscribe((arg: string) => {
      this.usernameLabel = arg;
    });

  }

  setUser(response: any){
    this.userForm.setValue({
      name_user: response.name,
      username: response.username,
      email: response.email,

    });
  }

  get username(){
    return this.userForm.get('username');
  }

  get name_user(){
    return this.userForm.get('name_user');
  }

  get email(){
    return this.userForm.get('email');
  }

  logout() {
    this.localService.clearStorage();
    this.router.navigateByUrl('/booklovers/login');
    this.headerService.updateToggle(false);
  }

  editUser(){

  }

  open(content: any) {
    this.userService.getById(this.user_id).subscribe((response: string) => {
      this.setUser(response);
    })

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

  deleteUser(modal: any){
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar meu cadastro'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(this.user_id).subscribe(
          (response) => {
            Swal.fire(
              'Deletado!',
              'Registro deletado.',
              'success'
            )
            this.modalService.dismissAll();
            this.userForm.reset();
            this.logout();
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
    })
  }

  saveUser(modal: any){
    if (this.userForm.invalid) {
      return;
    }

    this.getUser();

    this.userService.update(this.user).subscribe(
      (response) => {
        Swal.fire({
          title: 'Salvo',
          text: 'Registro salvo com sucesso',
          icon: 'success',
          timer: 2000,
        });
        this.modalService.dismissAll();
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

  getUser(){
    this.user.id = this.user_id;
    this.user.name = this.userForm.value.name_user;
    this.user.username = this.userForm.value.username;
    this.user.email = this.userForm.value.email;
    this.user.role_id = "6ccc7600-ded8-4676-8b05-8f28cad4b028";

  }

}
