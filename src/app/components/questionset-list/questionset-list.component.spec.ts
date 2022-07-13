import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsetListComponent } from './questionset-list.component';
import { HttpClientModule } from '@angular/common/http';
import { HelperService } from '../../services/helper/helper.service';
import { UserService } from 'src/app/services/user/user.service';
import { ActionService } from '../../services/action/action.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
describe('QuestionsetListComponent', () => {
  class RouterStub {
    navigate = jasmine.createSpy('navigate');
    url = ['/questionset'];
  }
  const mockUserData = {
    id: '5a587cc1',
    fullName: 'N11',
    firstName: 'N11',
    lastName: '',
    channelId: '12345',
    frameworkId: 'k-12',
    orgIds: ['12345']
  };
  let component: QuestionsetListComponent;
  let fixture: ComponentFixture<QuestionsetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ QuestionsetListComponent ],
      providers: [
        HelperService,
        UserService,
        ActionService,
        { provide: Router, useClass: RouterStub }
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
    spyOn(component, 'getAllQuestionsetList').and.callFake(() => {});
    component.ngOnInit();
    expect(component.getAllQuestionsetList).toHaveBeenCalled();
  });

  it('#navigateToQuestionset() should call router.nagivate', () => {
    spyOn(component, 'navigateToQuestionset').and.callThrough();
    component.navigateToQuestionset('do_12345', 'Draft');
    // tslint:disable-next-line:no-string-literal
    expect(component['router'].navigate).toHaveBeenCalledWith(['/edit/questionset/', 'do_12345', 'Draft']);
  });

  it('#getAllQuestionsetList() should call helperService.getQuestionsetList', () => {
    component.questionsetList = [];
    const userService = TestBed.get(UserService);
    spyOnProperty(userService, 'userProfile').and.returnValue(mockUserData);
    const helperService = TestBed.get(HelperService);
    spyOn(helperService, 'getQuestionsetList').and.returnValue(of({result: {QuestionSet:
      [{name: 'Test Questionset', status: 'Draft'}]}}));
    spyOn(component, 'getAllQuestionsetList').and.callThrough();
    component.getAllQuestionsetList();
    expect(component.getAllQuestionsetList).toHaveBeenCalled();
    expect(helperService.getQuestionsetList).toHaveBeenCalled();
    expect(component.questionsetList.length).toEqual(1);
  });
});
