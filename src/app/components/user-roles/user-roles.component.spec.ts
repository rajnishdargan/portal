import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRolesComponent } from './user-roles.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogRef } from '@angular/material/dialog';
describe('UserRolesComponent', () => {
  let component: UserRolesComponent;
  let fixture: ComponentFixture<UserRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ UserRolesComponent ],
      providers: [{provide: MatDialogRef , useValue: {} }]
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
