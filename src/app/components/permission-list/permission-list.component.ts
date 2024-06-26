import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Permission } from 'src/app/models/Permission';
import { PermissionService } from 'src/app/services/permission.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.css']
})
export class PermissionListComponent implements OnInit {
  permissionList: Permission[] = [];
  tableExport: any[] = [];
  isLoadingPdf: boolean = false;

  constructor(
    private permissionService: PermissionService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.permissionService.getAll().subscribe((response: any) => {
      this.permissionList = response;
    })
  }

  newPermission() {
    this.router.navigate(['/booklovers/permission', 'new']);

  }

  editPermission(id: string) {
    this.router.navigate(['/booklovers/permission', id]);
  }

  deletePermission(id: string) {
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

  exportPDF() {
    this.isLoadingPdf = true;

    var data: any[] = [];

    const columns = this.getColumns(this.permissionList);

    let date = new Date();
    var hour = date.toLocaleTimeString();
    var today = date.toLocaleDateString();
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.text(`Lista de Permissões - Booklovers - ${today} ${hour}`, 10, 10)
    doc.table(40, 20, this.tableExport, columns, {
      margins: 0,
      padding: 1,
      fontSize: 9,
      autoSize: true,
      printHeaders: true
    });
    doc.save(`Lista_Permissoes_Booklovers_${today}_${hour}.pdf`);
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
        result = 'Permissão'
        break;
      case 'url':
        result = 'URL'
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
