import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsetEditorComponent } from './questionset-editor.component';

describe('QuestionsetEditorComponent', () => {
  let component: QuestionsetEditorComponent;
  let fixture: ComponentFixture<QuestionsetEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsetEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
