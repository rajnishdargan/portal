import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-questionset-workspace',
  templateUrl: './questionset-workspace.component.html',
  styleUrls: ['./questionset-workspace.component.scss']
})
export class QuestionsetWorkspaceComponent implements OnInit {

  constructor(private router: Router) { }
  page: string;
  public userRole: string;
  ngOnInit(): void {
    this.userRole = JSON.parse(localStorage.getItem('userRole'));
    if (this.userRole === 'creator') {
      this.router.navigate(['/questionset/create']);
    } else {
      this.router.navigate(['/questionset/upForReview']);
    }
  }

  nagivateToPage(page): void {
    switch (page) {
      case 'create':
        this.router.navigate(['/questionset/create']);
        break;
      case 'draft':
        this.router.navigate(['/questionset/draft']);
        break;
      case 'upForReview':
        this.router.navigate(['/questionset/upForReview']);
        break;
      case 'review':
        this.router.navigate(['/questionset/review']);
        break;
      case 'published':
        this.router.navigate(['/questionset/published']);
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
