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

    var data = document.getElementById('contentToConvert');

    html2canvas(data).then(canvas => {
      var imgWidth = 190;
      var imgHeight = canvas.height * imgWidth / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 4;
      pdf.addImage(contentDataURL, 'PNG', 8, position, imgWidth, imgHeight)
      pdf.save('Lista de gêneros - booklovers.pdf');
    });
    this.isLoadingPdf = false;
  }
}
