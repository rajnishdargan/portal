import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {

  constructor(private router: Router, public dialogRef: MatDialogRef<UserRolesComponent>) { }
  public rolesData = ['creator', 'reviewer'];
  ngOnInit(): void {
  }

  nagivateToWorkspace(role): void {
    localStorage.setItem('userRole', JSON.stringify(role));
    this.router.navigate(['/questionset']);
    this.dialogRef.close();
  }

  getAllUsersByRoleType(): void {
  }

}
