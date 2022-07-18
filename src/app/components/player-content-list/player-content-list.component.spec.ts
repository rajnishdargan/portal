import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { PlayerContentListComponent } from './player-content-list.component';
import { SampleContentList } from './sample-content-list';

describe('PlayerContentListComponent', () => {
  let component: PlayerContentListComponent;
  let fixture: ComponentFixture<PlayerContentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerContentListComponent],
      imports: [MatToolbarModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerContentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the content list for FAQ and SA', () => {
    component.ngOnInit();
    expect(component.filteredList.mcq).toEqual(SampleContentList.mcq);
    expect(component.filteredList.sa).toEqual(SampleContentList.sa);
  });

  it('should navigate to player page when play content is clicked, with content identifier', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    const spy1 = spyOn(component, 'getNextContents');
    component.playContent(SampleContentList.mcq[0], 'mcq');
    expect(spy).toHaveBeenCalledWith(['/player', SampleContentList.mcq[0].id]);
    expect(spy1).toHaveBeenCalledWith(SampleContentList.mcq[0], 'mcq');
  });

  it('should reset the content list when reset filter is clicked', () => {
    component.resetFilter();
    expect(component.filteredList.mcq).toEqual([]);
    expect(component.filteredList.sa).toEqual([]);
  });

  it('should update the filter list based on the selected filers', () => {
    component.filteredList.mcq = [];
    component.updateFilterList('mcq', 'vertical');
    expect(component.filteredList.mcq).toEqual(SampleContentList.mcq.filter(content => content.category === 'vertical'));
  });

  it('should return next playable contents for mcq questions', () => {
    component.filteredList.mcq = SampleContentList.mcq;
    const list = component.getNextContents(SampleContentList.mcq[2], 'mcq');
    expect(list).toEqual(SampleContentList.mcq.slice(2, SampleContentList.mcq.length));
  });

  it('should return next playable contents for sa questions', () => {
    component.filteredList.sa = SampleContentList.sa;
    const list = component.getNextContents(SampleContentList.sa[1], 'sa');
    expect(list).toEqual(SampleContentList.sa);
  });

  it('should return null when the content list is empty', () => {
    component.filteredList.sa = [];
    const list = component.getNextContents(SampleContentList.sa[0], 'sa');
    expect(list).toEqual(null);
  });

  it('should set filter to subjective answer list sa', () => {
    const spy = spyOn(component, 'resetFilter');
    component.onFilterChange([component.filters[1]]);
    expect(spy).toHaveBeenCalled();
    expect(component.filteredList.sa).toEqual(SampleContentList.sa);
  });

  it('should set filter to subjective answer list mcq', () => {
    const spy = spyOn(component, 'resetFilter');
    component.onFilterChange([component.filters[0]]);
    expect(spy).toHaveBeenCalled();
    expect(component.filteredList.mcq).toEqual(SampleContentList.mcq);
  });

  it('should set filter to subjective answer list all', () => {
    const spy = spyOn(component, 'resetFilter');
    component.filters[0].selected = false;
    spyOn(component, 'updateFilterList');
    component.onFilterChange(component.filters);
    expect(spy).toHaveBeenCalled();
    expect(component.updateFilterList).toHaveBeenCalledWith('mcq', 'horizontal');
    expect(component.updateFilterList).toHaveBeenCalledWith('mcq', 'vertical');
    expect(component.updateFilterList).toHaveBeenCalledWith('mcq', 'grid');
    expect(component.updateFilterList).toHaveBeenCalledWith('mcq', 'solutions');
  });

});
