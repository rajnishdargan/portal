import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper/helper.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-questionset-create',
  templateUrl: './questionset-create.component.html',
  styleUrls: ['./questionset-create.component.scss']
})
export class QuestionsetCreateComponent implements OnInit {

  constructor(
  private router: Router,
  public helperService: HelperService) { }

  ngOnInit(): void {
    const userRole = JSON.parse(localStorage.getItem('userRole'));
    if (userRole !== 'creator') {
      this.router.navigate(['/questionset']);
    }
  }

  createContent(): void {
    const requestData = {
        questionset: {
          name: 'Untitled QuestionSet',
          mimeType: 'application/vnd.sunbird.questionset',
          primaryCategory: 'Practice Question Set',
          createdBy: environment.userDetails.id,
          createdFor: environment.channel,
          framework: environment.framework,
          code: '7d5aaa70-ffb8-d062-ba10-1db445a11dbc'
        }
    };
    this.helperService.createContent(requestData).subscribe(res => {
      console.log(res.result.identifier);
      this.navigateToQuestionset(res.result.identifier);
    }, err => {
      console.log('create content failed ::', err);
    });
  }

  navigateToQuestionset(id): void {
    this.router.navigate(['/edit/questionset/', id, 'draft']);
  }
}
