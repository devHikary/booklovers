import { map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { LocalService } from 'src/app/services/local.service';
import { StatisticService } from 'src/app/services/statistic.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css'],
})
export class StatisticComponent implements OnInit{
  user_id: string = '';
  currentYear: string = '';
  dataLabel: string[] = [];
  dataCount: number[] = [];
  chart: any = [];
  rating: any = {
    rating: 5,
    count: '0',
  };
  favoriteCount: number = 0;
  textPostit:any ={
    year: '',
    count: '',
  }

  constructor(
    private localService: LocalService,
    private statisticService: StatisticService,
  ){}

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear().toString();
    this.user_id = this.localService.getUserId();
    this.statisticService.getFavorite(this.user_id).subscribe((response: any) => {
      this.favoriteCount = +response[0].count;
    })
    this.statisticService.getRating('1',this.user_id).subscribe((response: any) => {
      this.rating = { rating: response[0].rating, count: response[0].count};
    })
    this.statisticService.getMonth(this.user_id).subscribe((response: any) => {
      trackerMonth.forEach(element => {
        response.forEach((r: any) =>{
          if(element.id == r.month)
            element.status = r.count;
        })
      });
    })
    this.statisticService.getYear(this.user_id).subscribe((response: any) => {
      // this.textPostit = {
      //   year: response[0].year.substring(0, 4),
      //   count: response[0].count,
      // }
      response.forEach((r : any) =>{
        if(r.year != null){
          this.dataCount.push(+r.count);
          this.dataLabel.push(r.year.substring(0, 4))
          if(r.year.substring(0, 4) === this.currentYear){
            this.textPostit = {
              year: r.year.substring(0, 4),
              count: r.count,
            }
        }
        }
      })
      this.barChartData = {
        labels: this.dataLabel,
        datasets: [
          {
            data: this.dataCount,
            label: 'Livros',
            borderWidth: 2,
            borderRadius: 5,
          },
        ],

      };
    })
    this.statisticService.getTheme(this.user_id).subscribe((response: any) => {
      console.log(response)
    })
  }
  public dataList = trackerMonth;

  bgColor(status: number) {
    if (status == 0) {
      return '#D9D9D9';
    } else if (status == 1) {
      return '#B2EC9D';
    } else {
      return '#A0A1EC';
    }
  }

  public barChartData: ChartConfiguration<'bar'>['data']

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales:{
      y:{
        ticks: {
          stepSize: 1
        }
      }

    }
  };
}

var trackerMonth = [
  {
    id: 1,
    label: 'J',
    status: 0,
    name: 'Janeiro',
  },
  {
    id: 2,
    label: 'F',
    status: 0,
    name: 'Fevereiro',
  },
  {
    id: 3,
    label: 'M',
    status: 0,
    name: 'Março',
  },
  {
    id: 4,
    label: 'A',
    status: 0,
    name: 'Abril',
  },
  {
    id: 5,
    label: 'M',
    status: 0,
    name: 'Maio',
  },
  {
    id: 6,
    label: 'J',
    status: 0,
    name: 'Junho',
  },
  {
    id: 7,
    label: 'J',
    status: 0,
    name: 'Julho',
  },
  {
    id: 8,
    label: 'A',
    status: 0,
    name: 'Agosto',
  },
  {
    id: 9,
    label: 'S',
    status: 0,
    name: 'Setembro',
  },
  {
    id: 10,
    label: 'O',
    status: 0,
    name: 'Outubro',
  },
  {
    id: 11,
    label: 'N',
    status: 0,
    name: 'Novembro',
  },
  {
    id: 12,
    label: 'D',
    status: 0,
    name: 'Dezembro',
  },
];
