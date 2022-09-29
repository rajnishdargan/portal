import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsetWorkspaceComponent } from './questionset-workspace.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('QuestionsetWorkspaceComponent', () => {

  let component: QuestionsetWorkspaceComponent;
  let fixture: ComponentFixture<QuestionsetWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ QuestionsetWorkspaceComponent ],
      providers: [UserService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsetWorkspaceComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#nagivateToPage() should route to create page', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    spyOn(component, 'nagivateToPage').and.callThrough();
    component.nagivateToPage('create');
    expect(router.navigate).toHaveBeenCalledWith(['/questionset/create']);
  });

  it('#nagivateToPage() should route to questionset-list page', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    spyOn(component, 'nagivateToPage').and.callThrough();
    component.nagivateToPage('questionset-list');
    expect(router.navigate).toHaveBeenCalledWith(['/questionset/questionset-list']);
  });

  it('#nagivateToPage() should route to default page', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    spyOn(component, 'nagivateToPage').and.callThrough();
    component.nagivateToPage('xyz');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('#navigatetoHome() should route to default page', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    spyOn(component, 'navigatetoHome').and.callThrough();
    component.navigatetoHome();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
