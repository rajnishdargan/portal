import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

export interface IFilter {
  name: string;
  selected: boolean;
  color: ThemePalette;
  type: string;
  category?: string;
  options?: IFilter[];
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() filters: IFilter[];
  @Output() filterChange = new EventEmitter<IFilter[]>();;

  ngOnInit(): void {
  }

  updateAllComplete(filterIndex: number) {
    this.filters[filterIndex].selected = this.filters[filterIndex].options !== null && this.filters[filterIndex].options.every(t => t.selected);
    console.log("Filter", this.filters);
    this.filterChange.emit(this.filters);
  }

  someComplete(filterIndex: number): boolean {
    if (this.filters[filterIndex].options === null) {
      return false;
    }
    return this.filters[filterIndex].options && this.filters[filterIndex].options.filter(t => t.selected).length > 0 && !this.filters[filterIndex].selected;
  }

  setAll(selected: boolean, filterIndex: number) {
    this.filters[filterIndex].selected = selected;

    if (this.filters[filterIndex].options) {
      this.filters[filterIndex].options.forEach(t => (t.selected = selected));
    }
    console.log("Filter1", this.filters);

    this.filterChange.emit(this.filters);
  }
}
