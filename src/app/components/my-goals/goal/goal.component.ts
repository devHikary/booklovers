import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
import { Goal } from 'src/app/models/Goal';
import { GoalService } from 'src/app/services/goal.service';
import { LocalService } from 'src/app/services/local.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css'],
})
export class GoalComponent implements OnInit {
  goal: Goal = new Goal();
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  maxDate = this.calendar.getToday();
  isNew: boolean = true;

  public goalForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    target: new FormControl(1, [Validators.required, Validators.min(1)]),
    amount: new FormControl(0),
    date_start: new FormControl('', [Validators.required]),
    date_end: new FormControl('', [Validators.required]),
    status: new FormControl(0),
  });

  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private location: Location,
    private localService: LocalService,
    private goalService: GoalService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id'] != 'new') {
        this.goalService.getById(params['id']).subscribe((response: any) => {
          this.isNew = false;
          this.setGoal(response);
        });
      }
    });
  }

  setGoal(goal: any) {
    this.goalForm.setValue({
      id: goal.id,
      name: goal.name,
      target: goal.target,
      amount: goal.amount,
      date_start: goal.date_start,
      date_end: goal.date_end,
      status: goal.status,
    });

    if (goal.date_start != null) {
      let start = goal.date_start.substring(0, 10).split('-').reverse();
      this.fromDate = new NgbDate(+start[2], +start[1], +start[0]);
    }

    if (goal.date_end != null) {
      let end = goal.date_end.substring(0, 10).split('-').reverse();
      this.toDate = new NgbDate(+end[2], +end[1], +end[0]);
    }
    this.goalForm.get('amount')?.disable();
  }

  get name() {
    return this.goalForm.get('name');
  }

  get target() {
    return this.goalForm.get('target');
  }
  get date_start() {
    return this.goalForm.get('date_start');
  }
  get date_end() {
    return this.goalForm.get('date_end');
  }
  get status() {
    return this.goalForm.get('status');
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      (this.fromDate && !this.toDate && date.after(this.fromDate)) ||
      date.equals(this.fromDate)
    ) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : null;
  }

  cancel() {
    this.location.back();
  }

  save() {
    if (this.toDate != undefined)
      this.goalForm.controls.date_end.setValue(
        this.toDate.day + '/' + this.toDate.month + '/' + this.toDate.year
      );
    if (this.fromDate != undefined)
      this.goalForm.controls.date_start.setValue(
        this.fromDate.day + '/' + this.fromDate.month + '/' + this.fromDate.year
      );

    if (this.goalForm.get('target').value < 1) return;

    if (this.goalForm.invalid) return;


    this.getGoal();

    if (this.isNew) {
      this.goalService.add(this.goal).subscribe(
        (response) => {
          Swal.fire({
            title: 'Salvo',
            text: 'Registro salvo com sucesso',
            icon: 'success',
            timer: 2000,
          });
          //this.router.navigate(['/booklovers/explorer/']);
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
    } else {
      this.goalService.update(this.goal).subscribe(
        (response) => {
          Swal.fire({
            title: 'Salvo',
            text: 'Registro salvo com sucesso',
            icon: 'success',
            timer: 2000,
          });
          //this.router.navigate(['/booklovers/explorer/']);
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

  getGoal() {
    this.goalForm.controls.date_start.setValue(
      this.fromDate.month + '/' + this.fromDate.day + '/' + this.fromDate.year
    );
    this.goalForm.controls.date_end.setValue(
      this.toDate.month + '/' + this.toDate.day + '/' + this.toDate.year
    );

    if (!this.isNew) this.goal.id = this.goalForm.value.id!;

    this.goal.user_id = this.localService.getUserId();
    this.goal.name = this.goalForm.value.name!;
    this.goal.target = this.goalForm.value.target!;
    this.goal.amount = this.goalForm.value.amount!;
    this.goal.date_start = this.goalForm.value.date_start!;
    this.goal.date_end = this.goalForm.value.date_end!;
  }
}
