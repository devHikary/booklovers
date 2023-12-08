import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Goal } from 'src/app/models/Goal';
import { GoalService } from 'src/app/services/goal.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-my-goals',
  templateUrl: './my-goals.component.html',
  styleUrls: ['./my-goals.component.css']
})
export class MyGoalsComponent implements OnInit{
  user_id: string = '';
  goalList: Goal[] = [];

  constructor(
    private localService: LocalService,
    private goalService: GoalService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.user_id = this.localService.getUserId();
    this.getAll();
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
}
