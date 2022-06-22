import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsetDraftComponent } from './questionset-draft.component';

describe('QuestionsetDraftComponent', () => {
  let component: QuestionsetDraftComponent;
  let fixture: ComponentFixture<QuestionsetDraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsetDraftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsetDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
