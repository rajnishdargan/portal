import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerContentListComponent } from './player-content-list.component';
import { NavigationService } from 'src/app/services/navigation.service';
import { RouterTestingModule } from '@angular/router/testing';
describe('PlayerContentListComponent', () => {
  let component: PlayerContentListComponent;
  let fixture: ComponentFixture<PlayerContentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ PlayerContentListComponent ],
      providers: [NavigationService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerContentListComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
