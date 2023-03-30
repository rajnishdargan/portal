import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRolesComponent } from './user-roles.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatLegacyDialogRef as MatDialogRef, MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { UserService } from 'src/app/services/user/user.service';
import { ActionService } from '../../services/action/action.service';
import { HttpClientModule } from '@angular/common/http';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
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
      ],
      schemas: [NO_ERRORS_SCHEMA]
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
