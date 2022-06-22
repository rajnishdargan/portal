import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsetCreateComponent } from './questionset-create.component';

describe('QuestionsetCreateComponent', () => {
  let component: QuestionsetCreateComponent;
  let fixture: ComponentFixture<QuestionsetCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsetCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
