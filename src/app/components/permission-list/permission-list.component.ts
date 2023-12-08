import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Permission } from 'src/app/models/Permission';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.css']
})
export class PermissionListComponent implements OnInit{
  permissionList: Permission[] = [];

  constructor(
    private permissionService: PermissionService,
    private router : Router,
  ){}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.permissionService.getAll().subscribe((response: any) =>{
      this.permissionList = response;
    })
  }

  newPermission(){
    this.router.navigate(['/booklovers/permission', 'new']);

  }

  editPermission(id: string){
    this.router.navigate(['/booklovers/permission', id]);
  }

  deletePermission(id: string){
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.permissionService.delete(id).subscribe(
          (response) => {
            Swal.fire(
              'Deletado!',
              'Registro deletado.',
              'success'
            )
            this.getAll();
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
}
