import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css'],
})
export class StatisticComponent {
  public dataList = trackerMonth;

  bgColor(status: string) {
    if (status == '0') {
      return '#D9D9D9';
    } else if (status == '1') {
      return '#B2EC9D';
    } else {
      return '#A0A1EC';
    }
  }
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        borderWidth: 2,
        borderRadius: 5,
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        label: 'Series B',
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };
}

const trackerMonth = [
  {
    id: 'J',
    status: '1',
    name: 'Janeiro',
  },
  {
    id: 'F',
    status: '0',
    name: 'Fevereiro',
  },
  {
    id: 'M',
    status: '0',
    name: 'Março',
  },
  {
    id: 'A',
    status: '2',
    name: 'Abril',
  },
  {
    id: 'M',
    status: '0',
    name: 'Maio',
  },
  {
    id: 'J',
    status: '1',
    name: 'Junho',
  },
  {
    id: 'J',
    status: '1',
    name: 'Janeiro',
  },
  {
    id: 'F',
    status: '0',
    name: 'Fevereiro',
  },
  {
    id: 'M',
    status: '0',
    name: 'Março',
  },
  {
    id: 'A',
    status: '2',
    name: 'Abril',
  },
  {
    id: 'M',
    status: '0',
    name: 'Maio',
  },
  {
    id: 'J',
    status: '1',
    name: 'Junho',
  },
];
