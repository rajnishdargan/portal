import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    private router: Router) { }

  ngOnInit(): void {
    this.users = _.get(this.data, 'usersData');
    this.selectedRoleType = _.get(this.data, 'selectedRoleType');
  }
  selectUser(user) {
    user.role = _.get(this.data, 'selectedRoleType');
    this.dialogRef.close();
    this.router.navigate(['/questionset']);
  }
}
