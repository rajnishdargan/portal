import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import * as _ from 'lodash-es';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users = [];
  public selectedRoleType: string;
  constructor(
    public dialogRef: MatDialogRef<UsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private userService:UserService) { }

  ngOnInit(): void {
    if (this.data) {
      if (_.get(this.data, 'usersData')) {
        this.users = _.get(this.data, 'usersData');
      }
      this.selectedRoleType = _.get(this.data, 'selectedRoleType');
    }
  }
  selectUser(user) {
    user.role = this.selectedRoleType;
    this.userService.setUserProfile(user)
    this.dialogRef.close();
    this.router.navigate(['/questionset']);
  }
}
