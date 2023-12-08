import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportFailure } from 'src/app/models/ReportFailure';
import { LocalService } from 'src/app/services/local.service';
import { ReportFailureService } from 'src/app/services/report-failure.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-failure',
  templateUrl: './report-failure.component.html',
  styleUrls: ['./report-failure.component.css']
})
export class ReportFailureComponent implements OnInit{
  report: ReportFailure =  new ReportFailure();
  isNew: boolean = true;
  book_id: string | null = null;

  public reportForm = new FormGroup({
    id: new FormControl(null),
    user_id: new FormControl(''),
    book_id: new FormControl(null),
    description: new FormControl('', [Validators.required]),
    createdAt: new FormControl(''),
    status: new FormControl(0),

  });

  constructor(
    private localService: LocalService,
    private reportService: ReportFailureService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
  ){}


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.book_id = params['b'];
      if (params['id'] != 'new') {
        this.reportService
          .getById(params['id'])
          .subscribe((response: any) => {
            this.isNew = false;

            this.setReport(response);
          });
      }
    });
  }

  setReport(report: any){
    this.reportForm.setValue({
      id: report.id,
      book_id: report.book_id === null? "Não informado" : report.book_id,
      user_id: report.user_id,
      description: report.description,
      createdAt: this.handleDate(report.createdAt),
      status: report.status,

    });

    this.reportForm.controls['book_id'].disable();
    this.reportForm.controls['createdAt'].disable();
  }

  handleDate(text: string): string {
    return text.substring(0, 10).split('-').reverse().join('/');
  }

  get description() {
    return this.reportForm.get('description');
  }


  cancel() {
    this.location.back();
  }

  save(){

    if(this.reportForm.invalid)
      return

      this.getReport();

      if(this.isNew){
        this.reportService.add(this.report).subscribe(
          (response) => {
            Swal.fire({
              title: 'Salvo',
              text: 'Registro salvo com sucesso',
              icon: 'success',
              timer: 2000,
            });
            this.location.back();
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
      }else{
        this.reportService.update(this.report).subscribe(
          (response) => {
            Swal.fire({
              title: 'Salvo',
              text: 'Registro salvo com sucesso',
              icon: 'success',
              timer: 2000,
            });
            this.location.back();
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

  }

  getReport(){
    if(!this.isNew)
      this.report.id = this.reportForm.value.id!;

    this.report.user_id = this.localService.getUserId();
    if(this.book_id != undefined)
      this.report.book_id = this.book_id;
    else
      this.report.book_id = null;
    this.report.description = this.reportForm.value.description!;
    this.report.createdAt = this.reportForm.value.createdAt!;
    this.report.status = this.reportForm.value.status!;

  }

}
