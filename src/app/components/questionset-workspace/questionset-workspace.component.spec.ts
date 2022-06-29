import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsetWorkspaceComponent } from './questionset-workspace.component';

describe('QuestionsetWorkspaceComponent', () => {
  let component: QuestionsetWorkspaceComponent;
  let fixture: ComponentFixture<QuestionsetWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsetWorkspaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsetWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
