import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Permission } from 'src/app/models/Permission';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit{
  permission: Permission = new Permission();
  isNew: boolean = true;

  public permissionForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required]),


  });
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private permissionService: PermissionService,
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if(params['id'] != 'new'){
        this.permissionService.getById(params['id']).subscribe((response: any) => {
          this.isNew = false;

          this.setPermission(response);
        });
      }
    });
  }
  get name() {
    return this.permissionForm.get('name');
  }
  get url() {
    return this.permissionForm.get('url');
  }

  setPermission(response: any){
    this.permissionForm.setValue({
      id: response.id,
      name: response.name,
      url: response.url,

    });
  }

  cancel() {
    this.location.back();
  }

  save(){

    if(this.permissionForm.invalid)
      return

      this.getPermission();

      if(this.isNew){
        this.permissionService.add(this.permission).subscribe(
          (response) => {
            Swal.fire({
              title: 'Salvo',
              text: 'Registro salvo com sucesso',
              icon: 'success',
              timer: 2000,
            });
            this.location.back();
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
      }else{
        this.permissionService.update(this.permission).subscribe(
          (response) => {
            Swal.fire({
              title: 'Salvo',
              text: 'Registro salvo com sucesso',
              icon: 'success',
              timer: 2000,
            });
            this.location.back();
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

  getPermission(){
    if(!this.isNew)
      this.permission.id = this.permissionForm.value.id!;

    this.permission.name = this.permissionForm.value.name!;
    this.permission.url = this.permissionForm.value.url!;


  }
}
