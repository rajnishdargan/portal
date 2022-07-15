import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRolesComponent } from './user-roles.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';
import { ActionService } from '../../services/action/action.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
describe('UserRolesComponent', () => {
  let component: UserRolesComponent;
  let fixture: ComponentFixture<UserRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, MatDialogModule],
      declarations: [ UserRolesComponent ],
      providers: [
        {provide: MatDialogRef , useValue: {} },
        UserService,
        ActionService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRolesComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
