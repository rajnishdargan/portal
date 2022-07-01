import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-questionset-workspace',
  templateUrl: './questionset-workspace.component.html',
  styleUrls: ['./questionset-workspace.component.scss']
})
export class QuestionsetWorkspaceComponent implements OnInit {

  constructor(public router: Router) { }
  page: string;
  public userRole: string;
  ngOnInit(): void {
    if (localStorage.getItem('userRole')) {
      this.userRole = JSON.parse(localStorage.getItem('userRole'));
    }
    if (this.router.url === '/questionset/create') {
      if (this.userRole === 'creator') {
        this.router.navigate(['/questionset/create']);
      } else {
        this.router.navigate(['/questionset/questionset-list']);
      }
    }
    if (this.router.url === '/questionset' && this.userRole === 'creator') {
      this.router.navigate(['/questionset/create']);
    }
    if (this.router.url === '/questionset' && this.userRole === 'reviewer') {
      this.router.navigate(['/questionset/questionset-list']);
    }
  }

  nagivateToPage(page): void {
    switch (page) {
      case 'create':
        this.router.navigate(['/questionset/create']);
        break;
      case 'questionset-list':
        this.router.navigate(['/questionset/questionset-list']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }

  navigatetoHome(): void {
    this.router.navigate(['/']);
  }

}
