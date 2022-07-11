import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UsersComponent } from '../users/users.component';
import * as _ from 'lodash-es';
@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {

  public rolesData = ['creator', 'reviewer'];
  public selectedRoleType: string;
  constructor(
    private router: Router,
    public userService: UserService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserRolesComponent>) { }
  
  ngOnInit(): void {
  }

  getAllUsersByRoleType(role): void {
    if (role) {
      this.selectedRoleType = role;
      localStorage.setItem('userRole', JSON.stringify(role));
      this.userService.getAllUsersByRoleType(role).subscribe((response) => {
        console.log('response', response);
        this.dialogRef.close();
        const usersData = _.get(response, 'result.users');
        this.openDialog(usersData);
      }, (error) => {
        console.log(error);
      });
    }
  }

  openDialog(users) {
    this.dialog.open(UsersComponent, {
      data: {
        usersData: users,
        selectedRoleType: this.selectedRoleType
      }
    });
  }
}
