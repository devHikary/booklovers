import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Theme } from 'src/app/models/Theme';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css']
})
export class ThemeListComponent implements OnInit{
  themeList: Theme[] = [];
  tableExport: any[] = [];
  isLoadingPdf: boolean = false;

  constructor(private themeService: ThemeService, private router: Router) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.themeService.getAll().subscribe((response: any) => {
      this.themeList = response;
    });
  }

  newAuthor() {
    this.router.navigate(['/booklovers/theme', 'new']);
  }

  editTheme(id: string) {
    this.router.navigate(['/booklovers/theme', id]);
  }

  deleteTheme(id: string) {
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
        this.themeService.delete(id).subscribe(
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

    const columns = this.getColumns(this.themeList);

    let date = new Date();
    var hour = date.toLocaleTimeString();
    var today = date.toLocaleDateString();
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.text(`Lista de Gêneros Literários - Booklovers - ${today} ${hour}`, 10, 10)
    doc.table(60, 20, this.tableExport, columns, {
      margins: 0,
      padding: 1,
      fontSize: 9,
      autoSize: true,
      printHeaders: true
    });
    doc.save(`Lista_GeneroLiterario_Booklovers_${today}_${hour}.pdf`);
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
        result = 'Gênero literário'
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
