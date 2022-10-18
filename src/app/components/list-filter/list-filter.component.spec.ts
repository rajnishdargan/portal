import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { ListFilterComponent } from './list-filter.component';
import { of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

describe('ListFilterComponent', () => {
  let component: ListFilterComponent;
  let fixture: ComponentFixture<ListFilterComponent>;
  const mockActivatedRoute = {
    params: of({
      id: 'do_12345',
      status: 'draft'
    }),
    queryParams: of({query: 'test'}),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ ListFilterComponent ],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should set queryParams and call handleSearch', () => {
    component.queryParams = undefined;
    component.query = undefined;
    spyOn(component, 'handleSearch').and.callFake(() => {});
    spyOn(component, 'ngOnInit').and.callThrough();
    component.modelChanged.next('test');
    component.ngOnInit();
    expect(component.queryParams).toBeDefined();
    expect(component.query).toBeDefined();
    component.modelChanged.pipe(debounceTime(1000)).
    subscribe(query => {
      expect(component.handleSearch).toHaveBeenCalled();
    });
  });

  it('handleSearch should set queryParam', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    component.query = 'test';
    component.queryParams = {query: ''};
    spyOn(component, 'handleSearch').and.callThrough();
    component.handleSearch();
    expect(router.navigate).toHaveBeenCalled();

  });

  it('keyup should set subject value', () => {
    component.query = '';
    spyOn(component, 'keyup').and.callThrough();
    component.keyup('test');
    expect(component.query).toEqual('test');
  });
});
