import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerComponent } from './player.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationService } from 'src/app/services/navigation.service';
import { QuestionCursorImplementationService } from 'src/app/services/question-cursor-implementation.service';
import { HttpClientModule } from '@angular/common/http';
import { EditConfigurationComponent } from '../edit-configuration/edit-configuration.component';
describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, RouterTestingModule, HttpClientModule],
      declarations: [ PlayerComponent ],
      providers: [NavigationService, QuestionCursorImplementationService, EditConfigurationComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
