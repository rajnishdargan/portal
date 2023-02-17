import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsetEditorComponent } from './questionset-editor.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { questionSetEditorConfig } from './data';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { ActionService } from '../../services/action/action.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('QuestionsetEditorComponent', () => {
  class RouterStub {
    navigate = jasmine.createSpy('navigate');
    url = ['/questionset', '/questionset/questionset-list'];
  }
  const mockActivatedRoute = {
    params: of({
      id: 'do_12345',
      status: 'Draft'
    }),
    snapshot: {params: {
      id: 'do_12345',
      status: 'Draft',
      state: 'create'
    }}
  };
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
  let component: QuestionsetEditorComponent;
  let fixture: ComponentFixture<QuestionsetEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [QuestionsetEditorComponent],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        UserService, ActionService, NavigationService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsetEditorComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit() should set the editorConfig.config.mode', () => {
    // localStorage.setItem('userRole', JSON.stringify('creator'));
    component.editorConfig = questionSetEditorConfig;
    spyOn(component, 'getEditorMode').and.returnValue('edit');
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.editorConfig.context.identifier).toEqual('do_12345');
    expect(component.editorConfig.config.mode).toEqual('edit');
  });

  it('#editorEventListener() should route to questionset', () => {
    const navigationService = TestBed.inject(NavigationService);
    spyOn(navigationService, 'goBack').and.callFake(() => {});
    spyOn(component, 'editorEventListener').and.callThrough();
    component.editorEventListener({ action: 'backContent' });
    expect(navigationService.goBack).toHaveBeenCalled();
  });

  it('#getEditorMode() should return  value edit', () => {
    const userService = TestBed.inject(UserService);
    spyOnProperty(userService, 'userProfile').and.returnValue(mockUserData);
    // localStorage.setItem('userRole', JSON.stringify('creator'));
    spyOn(component, 'getEditorMode').and.callThrough();
    const mode = component.getEditorMode('draft');
    expect(mode).toEqual('edit');
  });

  it('#getEditorMode() should return  value read', () => {
    const userService = TestBed.inject(UserService);
    spyOnProperty(userService, 'userProfile').and.returnValue(mockUserData);
    spyOn(component, 'getEditorMode').and.callThrough();
    const mode = component.getEditorMode('flagged');
    expect(mode).toEqual('read');
  });

  it('#getEditorMode() should return  value read', () => {
    const userService = TestBed.inject(UserService);
    spyOnProperty(userService, 'userProfile').and.returnValue(mockUserData);
    spyOn(component, 'getEditorMode').and.callThrough();
    const mode = component.getEditorMode('flagreview');
    expect(mode).toEqual('read');
  });

  it('#getEditorMode() should return  value review', () => {
    const userService = TestBed.inject(UserService);
    spyOnProperty(userService, 'userProfile').and.returnValue(mockUserData);
    spyOn(component, 'getEditorMode').and.callThrough();
    const mode = component.getEditorMode('draft');
    expect(mode).toEqual('edit');
  });

  it('#getEditorMode() should return  value read', () => {
    const userService = TestBed.inject(UserService);
    spyOnProperty(userService, 'userProfile').and.returnValue(mockUserData);
    spyOn(component, 'getEditorMode').and.callThrough();
    const mode = component.getEditorMode('review');
    expect(mode).toEqual('read');
  });

  it('#getEditorMode() should return  value read', () => {
    const userService = TestBed.inject(UserService);
    spyOnProperty(userService, 'userProfile').and.returnValue(mockUserData);
    spyOn(component, 'getEditorMode').and.callThrough();
    const mode = component.getEditorMode('live');
    expect(mode).toEqual('edit');
  });
});
