import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsetListComponent } from './questionset-list.component';
import { HttpClientModule } from '@angular/common/http';
import { HelperService } from '../../services/helper/helper.service';
import { UserService } from 'src/app/services/user/user.service';
import { ActionService } from '../../services/action/action.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { PaginationService } from 'src/app/services/pagination/pagination.service';
describe('QuestionsetListComponent', () => {
  const mockUserData = {
    id: '5a587cc1',
    fullName: 'N11',
    firstName: 'N11',
    lastName: '',
    channelId: '12345',
    frameworkId: 'k-12',
    orgIds: ['12345'],
    role: 'creator'
  };
  let component: QuestionsetListComponent;
  let fixture: ComponentFixture<QuestionsetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [QuestionsetListComponent],
      providers: [
        HelperService,
        UserService,
        ActionService,
        PaginationService,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({}),
            params: of({ pageNumber: '1' })
          }
        },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsetListComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit() should call #getAllQuestionsetList()', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    spyOn(component, 'getAllQuestionsetList').and.callFake(() => { });
    component.ngOnInit();
    expect(component.getAllQuestionsetList).toHaveBeenCalled();
  });

  it('#navigatetoHome() should nagivate to home', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    spyOn(component, 'navigatetoHome').and.callThrough();
    component.navigatetoHome();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  })

  it('#navigateToQuestionset() should call router.nagivate', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    spyOn(component, 'navigateToQuestionset').and.callThrough();
    component.navigateToQuestionset('do_12345', 'Draft');
    expect(router.navigate).toHaveBeenCalledWith(['/edit/questionset/', 'do_12345', 'Draft']);
  });

  it('#getAllQuestionsetList() should for creator', () => {
    component.totalCount = 0;
    component.showLoader = true;
    component.userRole = undefined;
    component.query = {};
    component.questionsetList = [];
    const userService = TestBed.inject(UserService);
    const creatorUserData = mockUserData;
    spyOnProperty(userService, 'userProfile').and.returnValue(creatorUserData);
    const paginationService = TestBed.inject(PaginationService);
    spyOn(paginationService, 'getPager').and.returnValue({
      totalItems: 83,
      currentPage: 1,
      pageSize: 9,
      totalPages: 10,
      startPage: 1,
      endPage: 5,
      startIndex: 0,
      endIndex: 8,
      pages: [1, 2, 3, 4, 5]
    });
    const helperService = TestBed.inject(HelperService);
    spyOn(helperService, 'getQuestionsetList').and.returnValue(of({
      result: {
        QuestionSet:
          [{ name: 'Test Questionset', status: 'Draft' }],
        count: 1
      }
    }));
    spyOn(component, 'getAllQuestionsetList').and.callThrough();
    component.getAllQuestionsetList(10, 1, {});
    expect(component.userRole).toEqual('creator');
    expect(component.getAllQuestionsetList).toHaveBeenCalled();
    expect(helperService.getQuestionsetList).toHaveBeenCalled();
    expect(component.questionsetList.length).toEqual(1);
    expect(component.totalCount).toEqual(1);
    expect(component.showLoader).toBeFalsy();
    expect(paginationService.getPager).toHaveBeenCalled();
  });

  it('#getAllQuestionsetList() should for reviewer', () => {
    component.userRole = undefined;
    component.query = {};
    component.questionsetList = [];
    const userService = TestBed.inject(UserService);
    const reviwerUserData = mockUserData;
    reviwerUserData.role = 'reviewer';
    spyOnProperty(userService, 'userProfile').and.returnValue(reviwerUserData);
    const paginationService = TestBed.inject(PaginationService);
    spyOn(paginationService, 'getPager').and.returnValue({
      totalItems: 83,
      currentPage: 1,
      pageSize: 9,
      totalPages: 10,
      startPage: 1,
      endPage: 5,
      startIndex: 0,
      endIndex: 8,
      pages: [1, 2, 3, 4, 5]
    });
    const helperService = TestBed.inject(HelperService);
    spyOn(helperService, 'getQuestionsetList').and.returnValue(of({
      result: {
        QuestionSet:
          [{ name: 'Test Questionset', status: 'Draft' }],
        count: 1
      }
    }));
    spyOn(component, 'getAllQuestionsetList').and.callThrough();
    component.getAllQuestionsetList(10, 1, {});
    expect(component.userRole).toEqual('reviewer');
    expect(component.getAllQuestionsetList).toHaveBeenCalled();
    expect(helperService.getQuestionsetList).toHaveBeenCalled();
    expect(component.questionsetList.length).toEqual(1);
    expect(paginationService.getPager).toHaveBeenCalled();
  });
});
