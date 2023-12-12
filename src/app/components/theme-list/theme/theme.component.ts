import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Theme } from 'src/app/models/Theme';
import { ThemeService } from 'src/app/services/theme.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit{
  theme: Theme = new Theme();
  isNew: boolean = true;
  isPermissionEmpty: boolean = false;

  public themeForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id'] != 'new') {
        this.themeService.getById(params['id']).subscribe((response: any) => {
          this.isNew = false;

          this.setTheme(response);
        });
      }
    });
  }

  setTheme(response: any) {
    this.themeForm.setValue({
      id: response.id,
      name: response.name,
    });
  }

  get name() {
    return this.themeForm.get('name');
  }

  cancel() {
    this.location.back();
  }

  save() {
    if (this.themeForm.invalid) return;

    this.getTheme();

    if (this.isNew) {
      this.themeService.add(this.theme).subscribe(
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
    } else {
      this.themeService.update(this.theme).subscribe(
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

  getTheme() {
    if (!this.isNew) this.theme.id = this.themeForm.value.id!;

    this.theme.name = this.themeForm.value.name!;
  }
}

