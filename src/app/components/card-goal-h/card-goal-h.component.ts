import { Component, Input } from '@angular/core';
import { Goal } from 'src/app/models/Goal';

@Component({
  selector: 'app-card-goal-h',
  templateUrl: './card-goal-h.component.html',
  styleUrls: ['./card-goal-h.component.css']
})
export class CardGoalHComponent {
  @Input() goal: Goal = new Goal();

  detailGoal(id: string){

  }

  handleDate(text: string): string {
    return text.substring(0, 10).split('-').reverse().join('/');
  }

  handleProgress(target: number, amount: number): number{

    console.log(Math.round((amount/target) *100))
    return Math.round((amount/target) *100);
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
}
