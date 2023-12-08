import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Permission } from 'src/app/models/Permission';
import { Role } from 'src/app/models/Role';
import { PermissionService } from 'src/app/services/permission.service';
import { RoleService } from 'src/app/services/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit {
  role: Role = new Role();
  permissionList: any[] = [];
  permissionSelected: Permission[] = [];
  isNew: boolean = true;
  isPermissionEmpty: boolean = false;

  public roleForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    // permissions: new FormControl([], [Validators.required]),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private roleService: RoleService,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.permissionService.getAll().subscribe((response : any) => {
      this.permissionList = response;
    });

    this.activatedRoute.params.subscribe((params) => {
      if (params['id'] != 'new') {
        this.roleService.getById(params['id']).subscribe((response: any) => {
          this.isNew = false;

          this.setRole(response);
        });
      }
    });
  }

  setRole(response: any) {
    this.roleForm.setValue({
      id: response.id,
      name: response.name,
      // permissions: response.permissions,
    });
    this.permissionSelected = response.Permissions;

    const teste = this.permissionList.map((permission) => {
      this.permissionSelected.forEach(selected =>{
        if(selected.id === permission.id) {
          permission.checked = true;
        } else{
          // permission.checked = false;
        }
      })
      return permission;
    })

  }

  get name() {
    return this.roleForm.get('name');
  }
  get permissions() {
    return this.roleForm.get('permissions');
  }

  cancel() {
    this.location.back();
  }

  save() {
    this.isPermissionEmpty = false;
    if (this.roleForm.invalid) return;

    var selected = this.permissionList.filter(p => p.checked).map( p=> p);
    selected.forEach((p: any) =>{
      this.role.permissions.push(p.id)
    })

    if(selected.length < 1) {
      this.isPermissionEmpty = true;
      return;
    }
    this.getRole();

    if (this.isNew) {
      this.roleService.add(this.role).subscribe(
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
    } else {
      this.roleService.update(this.role).subscribe(
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

  getRole() {
    if (!this.isNew) this.role.id = this.roleForm.value.id!;

    this.role.name = this.roleForm.value.name!;
    // this.role.permissions = this.roleForm.value.permissions!;
  }
}
