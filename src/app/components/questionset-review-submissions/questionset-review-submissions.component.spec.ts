import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsetReviewSubmissionsComponent } from './questionset-review-submissions.component';

describe('QuestionsetReviewSubmissionsComponent', () => {
  let component: QuestionsetReviewSubmissionsComponent;
  let fixture: ComponentFixture<QuestionsetReviewSubmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsetReviewSubmissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsetReviewSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
