import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Role } from 'src/app/models/Role';
import { RoleService } from 'src/app/services/role.service';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css'],
})
export class RoleListComponent implements OnInit {
  roleList: Role[] = [];
  tableExport: any[] = [];
  isLoadingPdf: boolean = false;

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

  exportPDF() {
    this.isLoadingPdf = true;

    var data: any[] = [];

    const columns = this.getColumns(this.roleList);

    let date = new Date();
    var hour = date.toLocaleTimeString();
    var today = date.toLocaleDateString();
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.text(`Lista de Perfis - Booklovers - ${today} ${hour}`, 10, 10)
    doc.table(60, 20, this.tableExport, columns, {
      margins: 0,
      padding: 1,
      fontSize: 9,
      autoSize: true,
      printHeaders: true
    });
    doc.save(`Lista_Perfis_Booklovers_${today}_${hour}.pdf`);
    this.isLoadingPdf = false;
  }

  getColumns(data: any[]): string[] {
    const columns = [];
    data.forEach(row => {
      var objTemp = new Object();
      Object.keys(row).forEach(col => {
        var colConvert = this.handleHeader(col);
        if (!columns.includes(colConvert)) {
          columns.push(colConvert);

        }
        objTemp[colConvert] = row[col];
      });
      this.tableExport.push(objTemp);
    });
    return columns;
  }

  handleHeader(name: string): string {
    let result = ''
    switch (name) {
      case 'id':
        result = 'ID'
        break;
      case 'name':
        result = 'Perfil'
        break;
      case 'createdAt':
        result = 'Data de criação'
        break;
      case 'updatedAt':
        result = 'Data de atualização'
        break;
      default:
        result = 'Não definido'
        break;
    }

    return result;
  }
}
