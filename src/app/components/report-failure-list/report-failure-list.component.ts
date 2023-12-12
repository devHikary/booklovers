import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ReportFailure } from 'src/app/models/ReportFailure';
import { LocalService } from 'src/app/services/local.service';
import { ReportFailureService } from 'src/app/services/report-failure.service';

@Component({
  selector: 'app-report-failure-list',
  templateUrl: './report-failure-list.component.html',
  styleUrls: ['./report-failure-list.component.css']
})
export class ReportFailureListComponent implements OnInit{
  reportList: ReportFailure[] = [];
  user_id: string = '';
  isLoadingPdf: boolean = false;

  constructor(
    private localService: LocalService,
    private reportService: ReportFailureService,
    private router : Router,
  ){}

  ngOnInit(): void {
    this.user_id = this.localService.getUserId();
    this.reportService.getAll().subscribe((response: any) =>{
      this.reportList = response;
    })
  }

  newReport(){
    this.router.navigate(['/booklovers/report-failure'], {queryParams: {b: null, id: 'new'}});
  }

  handleDate(text: string): string {
    return text.substring(0, 10).split('-').reverse().join('/');
  }

  handleStatus(status: number): string{
    let result = ''
    switch (status) {
      case 0:
        result = 'Aberto'
        break;
      case 1:
        result = 'Em análise'
        break;
      case 2:
        result = 'Concluído'
        break;
      case 3:
        result = 'Rejeitado'
        break;
      default:
        result = 'Não definido'
        break;
    }

    return result;
  }

  editReport(id: string){
    this.router.navigate(['/booklovers/report-failure'], {queryParams: {b: null, id: id}});
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
      pdf.save('Relatório de Falas e Sugestões - booklovers.pdf');
    });
    this.isLoadingPdf = false;
  }
}
