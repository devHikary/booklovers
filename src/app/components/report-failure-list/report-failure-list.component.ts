import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private localService: LocalService,
    private reportService: ReportFailureService,
    private router : Router,
  ){}

  ngOnInit(): void {
    this.user_id = this.localService.getUserId();
    this.reportService.getAll().subscribe((response: any) =>{
      this.reportList = response;
      console.log(this.reportList);
    })
  }

  newReport(){
    this.router.navigate(['/booklovers/report-failure/', 'new']);
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
}
