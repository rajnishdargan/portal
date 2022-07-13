import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsetWorkspaceComponent } from './questionset-workspace.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { HttpClientModule } from '@angular/common/http';
describe('QuestionsetWorkspaceComponent', () => {
  class RouterStub {
    public navigate = jasmine.createSpy('navigate');
    public url = ['/questionset/create', '/questionset/questionset-list', '/questionset'];
  }
  let component: QuestionsetWorkspaceComponent;
  let fixture: ComponentFixture<QuestionsetWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ QuestionsetWorkspaceComponent ],
      providers: [{ provide: Router, useClass: RouterStub }, UserService]
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
    spyOn(component, 'nagivateToPage').and.callThrough();
    component.nagivateToPage('create');
    // tslint:disable-next-line:no-string-literal
    expect(component['router'].navigate).toHaveBeenCalledWith(['/questionset/create']);
  });

  it('#nagivateToPage() should route to questionset-list page', () => {
    spyOn(component, 'nagivateToPage').and.callThrough();
    component.nagivateToPage('questionset-list');
    // tslint:disable-next-line:no-string-literal
    expect(component['router'].navigate).toHaveBeenCalledWith(['/questionset/questionset-list']);
  });
});
