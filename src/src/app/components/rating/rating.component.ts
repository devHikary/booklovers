import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnChanges {

  @Input() rate: number = 0;

  currentRate = this.rate;

	ariaValueText(current: number, max: number) {
    return `${current} out of ${max} hearts`;
	}

  ngOnChanges(changes: SimpleChanges): void {
    //changes.currentRate.currentValue = rate;
  }

}
