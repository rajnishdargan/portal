import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-questionset',
  templateUrl: './questionset.component.html',
  styleUrls: ['./questionset.component.scss']
})
export class QuestionsetComponent implements OnInit {

  constructor(private router: Router) { }
  page: string;
  ngOnInit(): void {
    // this.page = 'create';
    this.router.navigate(['/questionset/create']);
  }

  nagivateToPage(page): void {
    switch (page) {
      case 'create':
        this.router.navigate(['/questionset/create']);
        break;
      case 'draft':
        this.router.navigate(['/questionset/draft']);
        break;
      default:
        this.router.navigate(['/questionset']);
        break;
    }
    // this.page = page;
  }

  navigatetoHome(): void {
    this.router.navigate(['/']);
  }

}
