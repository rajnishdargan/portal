import { Component, OnInit } from '@angular/core';
import { questionSetEditorConfig } from './data';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash-es';
@Component({
  selector: 'app-questionset-editor',
  templateUrl: './questionset-editor.component.html',
  styleUrls: ['./questionset-editor.component.scss']
})
export class QuestionsetEditorComponent implements OnInit {

  public editorConfig: any = questionSetEditorConfig;
  constructor(
    public router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.editorConfig.context.identifier = params.id;
      this.editorConfig.config.mode = this.getEditorMode(params.status);
    });
  }

  editorEventListener(event): any{
    if (event.action === 'backContent') {
      this.router.navigate(['/questionset']);
    }
  }

  getEditorMode(status): string {
    const contentStatus = _.toLower(status);
    if (contentStatus === 'draft') {
      return 'edit';
    }

    if (contentStatus === 'flagged' || contentStatus === 'flagreview') {
      return 'read';
    }

    if (contentStatus === 'review') {
      return 'review';
    }

    if (contentStatus === 'reviewsubmitted' || contentStatus === 'live') {
      return 'read';
    }
  }
}
