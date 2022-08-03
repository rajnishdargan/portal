import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';
import { UsersComponent } from '../users/users.component';
import * as _ from 'lodash-es';

import { Router } from '@angular/router';
@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {

  public rolesData = ['creator', 'reviewer'];
  public selectedRoleType: string;
  constructor(
    public userService: UserService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserRolesComponent>,
    private router: Router) { }
  
  ngOnInit(): void {
  }

  getAllUsersByRoleType(role): void {
    if (role) {
      this.selectedRoleType = role;
      this.userService.getAllUsersByRoleType(role).subscribe((response) => {
        this.dialogRef.close();
        const usersData = _.get(response, 'result.users');
        this.openDialog(usersData);
      }, (error) => {
        console.log(error);
        this.dialogRef.close();
        this.router.navigate(['/']);
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
