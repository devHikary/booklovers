import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Goal } from 'src/app/models/Goal';
import { GoalService } from 'src/app/services/goal.service';
import { LocalService } from 'src/app/services/local.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { logEvent } from 'firebase/analytics';
import { analytics } from 'src/app/services/firebase';

@Component({
  selector: 'app-my-goals',
  templateUrl: './my-goals.component.html',
  styleUrls: ['./my-goals.component.css']
})
export class MyGoalsComponent implements OnInit{
  user_id: string = '';
  goalList: Goal[] = [];
  tableExport: any[] = [];
  isLoadingPdf: boolean = false;

  constructor(
    private localService: LocalService,
    private goalService: GoalService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.user_id = this.localService.getUserId();
    this.getAll();
    logEvent(analytics, 'page_view',{
      page_title: "Desafios"
    });
  }

  getAll(){
    this.goalService.getAll(this.user_id).subscribe((response: any) =>{
      this.goalList = response;
    })
  }

  handleDate(text: string): string {
    return text.substring(0, 10).split('-').reverse().join('/');
  }

  handleStatus(status: number): string{
    let result = ''
    switch (status) {
      case 0:
        result = 'Em andamento'
        break;
      case 1:
        result = 'Não iniciado'
        break;
      case 2:
        result = 'Concluído'
        break;
      case 3:
        result = 'Expirado'
        break;
      default:
        result = 'Não definido'
        break;
    }

    return result;
  }

  newGoal(){
    this.router.navigate(['/booklovers/goal/', 'new']);
  }

  editGoal(id: string){
    this.router.navigate(['/booklovers/goal/', id]);
  }

  deleteGoal(id: string){
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
        this.goalService.delete(id).subscribe(
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

    const columns = this.getColumns(this.goalList);

    let date = new Date();
    var hour = date.toLocaleTimeString();
    var today = date.toLocaleDateString();
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.text(`Lista de Desafio - Booklovers - ${today} ${hour}`, 10, 10)
    doc.table(1, 20, this.tableExport, columns, {
      margins: 0,
      padding: 1,
      fontSize: 9,
      autoSize: false,
      printHeaders: true,
    });
    doc.save(`Lista_Desafios_Booklovers_${today}_${hour}.pdf`);
    this.isLoadingPdf = false;
  }

  getColumns(data: any[]): string[] {
    const columns = [];
    data.forEach(row => {
      var objTemp = new Object();
      Object.keys(row).forEach(col => {

        var colConvert = this.handleHeader(col);
        if ((!columns.includes(colConvert)&&(colConvert != 'Não definido'))) {
          columns.push(colConvert);
        }
        if(colConvert == 'Status')
          row[col] = this.handleStatus(row[col]);
        if((colConvert == 'Data fim') || (colConvert == 'Data  inicio') )
          row[col] = this.handleDate(row[col]);

        if(typeof row[col] == 'number' ){
          row[col] = row[col].toString();
        }


        if((colConvert != 'Não definido'))
          objTemp[colConvert] = row[col];
      });
      this.tableExport.push(objTemp);
    });
    return columns;
  }

  handleHeader(name: string): string {
    let result = ''
    switch (name) {
      case 'name':
        result = 'Desafio'
        break;
      case 'target':
        result = 'Objetivo'
        break;
      case 'amount':
        result = 'Contagem Atual'
        break;
      case 'date_end':
        result = 'Data fim'
        break;
      case 'date_start':
        result = 'Data  inicio'
        break;
      case 'status':
        result = 'Status'
        break;
      default:
        result = 'Não definido'
        break;
    }

    return result;
  }
}
