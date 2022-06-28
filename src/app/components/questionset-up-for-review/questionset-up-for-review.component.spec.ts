import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsetUpForReviewComponent } from './questionset-up-for-review.component';

describe('QuestionsetUpForReviewComponent', () => {
  let component: QuestionsetUpForReviewComponent;
  let fixture: ComponentFixture<QuestionsetUpForReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsetUpForReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsetUpForReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
