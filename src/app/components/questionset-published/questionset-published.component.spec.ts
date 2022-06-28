import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsetPublishedComponent } from './questionset-published.component';

describe('QuestionsetPublishedComponent', () => {
  let component: QuestionsetPublishedComponent;
  let fixture: ComponentFixture<QuestionsetPublishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsetPublishedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsetPublishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
