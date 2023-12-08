import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Role } from 'src/app/models/Role';
import { RoleService } from 'src/app/services/role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css'],
})
export class RoleListComponent implements OnInit {
  roleList: Role[] = [];

  constructor(private roleService: RoleService, private router: Router) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.roleService.getAll().subscribe((response: any) => {
      this.roleList = response;
    });
  }

  newRole() {
    this.router.navigate(['/booklovers/role', 'new']);
  }

  editRole(id: string) {
    this.router.navigate(['/booklovers/role', id]);
  }

  deleteRole(id: string) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.roleService.delete(id).subscribe(
          (response) => {
            Swal.fire('Deletado!', 'Registro deletado.', 'success');
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
    });
  }
}
