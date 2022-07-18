import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent, IFilter } from './filter.component';
import { mockFilterData } from './filter.component.spec.data';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateAllComplete', () => {
    component.filters = mockFilterData.filters as IFilter[];
    spyOn(component.filterChange, 'emit');
    component.updateAllComplete(0);
    expect(component.filters[0].selected).toBe(false);
    expect(component.filterChange.emit).toHaveBeenCalled();

  });
});
