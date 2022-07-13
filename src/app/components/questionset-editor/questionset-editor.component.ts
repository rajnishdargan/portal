import { Component, OnInit } from '@angular/core';
import { questionSetEditorConfig } from './data';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import * as _ from 'lodash-es';
@Component({
  selector: 'app-questionset-editor',
  templateUrl: './questionset-editor.component.html',
  styleUrls: ['./questionset-editor.component.scss']
})
export class QuestionsetEditorComponent implements OnInit {

  public editorConfig: any = questionSetEditorConfig;
  constructor(
    public router: Router, private activatedRoute: ActivatedRoute,
    public userService: UserService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.editorConfig.context.identifier = params.id;
      this.editorConfig.config.mode = this.getEditorMode(params.status);
    });
  }

  editorEventListener(event): any{
    console.log('editor event', event);
    if (event.action === 'backContent' || event.action === 'submitContent' || event.action === 'publishContent' || event.action === 'rejectContent') {
      this.router.navigate(['/questionset/questionset-list']);
    }
  }

  getEditorMode(status): string {
    const userRole = this.userService.userProfile.role;
    const contentStatus = status.toLowerCase();
    if (contentStatus === 'draft' || contentStatus === 'live' || contentStatus === 'flagdraft'
      || contentStatus === 'unlisted') {
        if (userRole === 'creator') {
          return 'edit';
        } else if (userRole === 'reviewer') {
          return 'read';
        }
    }

    if (contentStatus === 'flagged' || contentStatus === 'flagreview') {
      return 'read';
    }

    if (contentStatus === 'review') {
      if (userRole === 'creator') {
        return 'read';
      } else if (userRole === 'reviewer') {
        return 'review';
      }
    }
  }
}
