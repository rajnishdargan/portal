import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openPlayerPage(): void {
    this.router.navigate(['/content-list']);
  }
  openEditorPage(): void {
    this.router.navigate(['/questionset-list']);
  }

}
