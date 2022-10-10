import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsetCreateComponent } from './questionset-create.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HelperService } from '../../services/helper/helper.service';
import { UserService } from 'src/app/services/user/user.service';
import { ActionService } from '../../services/action/action.service';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
describe('QuestionsetCreateComponent', () => {
  class RouterStub {
    navigate = jasmine.createSpy('navigate');
    url = ['/questionset', '/edit/questionset/'];
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
  let component: QuestionsetCreateComponent;
  let fixture: ComponentFixture<QuestionsetCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientModule],
      declarations: [ QuestionsetCreateComponent ],
      providers: [ HelperService, UserService, ActionService,
        { provide: Router, useClass: RouterStub } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsetCreateComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('#createContent() should call #navigateToQuestionset()', () => {
    const userService = TestBed.inject(UserService);
    spyOnProperty(userService, 'userProfile').and.returnValue(mockUserData);
    const helperService = TestBed.inject(HelperService);
    spyOn(helperService, 'createContent').and.returnValue(of({result: {identifier: 'do_12345'}}));
    spyOn(component, 'navigateToQuestionset').and.callFake(() => {});
    spyOn(component, 'createContent').and.callThrough();
    component.createContent();
    expect(component.createContent).toHaveBeenCalled();
    expect(helperService.createContent).toHaveBeenCalled();
    expect(component.navigateToQuestionset).toHaveBeenCalledWith('do_12345');
  });

  it ('#createContent() should not call #navigateToQuestionset()', () => {
    const userService = TestBed.inject(UserService);
    spyOnProperty(userService, 'userProfile').and.returnValue(mockUserData);
    const helperService = TestBed.inject(HelperService);
    spyOn(helperService, 'createContent').and.returnValue(throwError({}));
    spyOn(component, 'navigateToQuestionset').and.callFake(() => {});
    spyOn(component, 'createContent').and.callThrough();
    component.createContent();
    expect(component.createContent).toHaveBeenCalled();
    expect(helperService.createContent).toHaveBeenCalled();
    expect(component.navigateToQuestionset).not.toHaveBeenCalled();
  });

  it('#navigateToQuestionset() should call router.nagivate', () => {
    spyOn(component, 'navigateToQuestionset').and.callThrough();
    component.navigateToQuestionset('do_12345');
    // tslint:disable-next-line:no-string-literal
    expect(component['router'].navigate).toHaveBeenCalledWith(['/edit/questionset/', 'do_12345', 'Draft', 'create']);
  });
});
