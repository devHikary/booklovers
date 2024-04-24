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
export class ReportFailureListComponent implements OnInit {
  reportList: ReportFailure[] = [];
  tableExport: any[] = [];
  user_id: string = '';
  isLoadingPdf: boolean = false;

  constructor(
    private localService: LocalService,
    private reportService: ReportFailureService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user_id = this.localService.getUserId();
    this.reportService.getAll().subscribe((response: any) => {
      this.reportList = response;
    })
  }

  newReport() {
    this.router.navigate(['/booklovers/report-failure'], { queryParams: { b: null, id: 'new' } });
  }

  handleDate(text: string): string {
    return text.substring(0, 10).split('-').reverse().join('/');
  }

  handleStatus(status: number): string {
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

  handleHeader(name: string): string {
    let result = ''
    switch (name) {
      case 'id':
        result = 'ID'
        break;
      case 'book_id':
        result = 'ID do livro'
        break;
      case 'description':
        result = 'Descrição'
        break;
      case 'status':
        result = 'Status'
        break;
      case 'createdAt':
        result = 'Data de criação '
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

  editReport(id: string) {
    this.router.navigate(['/booklovers/report-failure'], { queryParams: { b: null, id: id } });
  }

  exportPDF() {
    this.isLoadingPdf = true;

    var data: any[] = [];

    const columns = this.getColumns(this.reportList);
    const csvData = this.convertToCsv(this.reportList, columns);

    let date = new Date();
    var hour = date.toLocaleTimeString();
    var today = date.toLocaleDateString();
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.text(`Relatório de Falhas e Sugestões - Booklovers - ${today} ${hour}`, 10, 10)
    doc.table(1, 20, this.tableExport, columns, {
      margins: 0,
      padding: 1,
      fontSize: 9,
      autoSize: true,
      printHeaders: true
    });
    doc.save(`Relatorio_FalhasSugestões_Booklovers_${today}_${hour}.pdf`);
    this.isLoadingPdf = false;
  }

  getColumns(data: any[]): string[] {
    const columns = [];
    data.forEach(row => {
      var objTemp = new Object();
      Object.keys(row).forEach(col => {
        var colConvert = this.handleHeader(col);
        if (!columns.includes(colConvert) && (colConvert != 'Não definido')) {
          columns.push(colConvert);
        }
        if (row[col] === null)
          row[col] = "Não informado";
        if (colConvert === 'Status')
          row[col] = this.handleStatus(row[col]);
        if((colConvert == 'Data de criação ') || (colConvert == 'Data de atualização') )
          row[col] = this.handleDate(row[col]);

        if(colConvert != 'Não definido')
          objTemp[colConvert] = row[col];
      });
      this.tableExport.push(objTemp);
    });
    return columns;
  }

  convertToCsv(data: any[], columns: string[]): string {
    let csv = '';
    csv += columns.join(';') + '\n';
    data.forEach(row => {
      const values = [];
      columns.forEach(col => {
        values.push(row[col] || '');
      });
      csv += values.join(';') + '\n';
    });
    return csv;
  }

  downloadFile(data: string, filename: string, type: string) {
    const blob = new Blob([data], { type: type });
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  }
}
