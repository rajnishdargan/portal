import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { UserRolesComponent } from '../user-roles/user-roles.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openPlayerPage(): void {
    this.router.navigate(['/content-list']);
  }
  openEditorPage(): void {
    this.dialog.open(UserRolesComponent, {
      data: {
      }
    });
  }

}
