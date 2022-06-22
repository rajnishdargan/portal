import { Component, OnInit } from '@angular/core';
import { questionSetEditorConfig } from './data';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-questionset-editor',
  templateUrl: './questionset-editor.component.html',
  styleUrls: ['./questionset-editor.component.scss']
})
export class QuestionsetEditorComponent implements OnInit {

  constructor(
    public router: Router, private activatedRoute: ActivatedRoute) { }
  public editorConfig: any = questionSetEditorConfig;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.editorConfig.context.identifier = params.id;
    });
  }

  editorEventListener(event): any{
    if (event.action === 'backContent') {
      console.log('editor event', event);
      this.router.navigate(['/questionset']);
    }
  }
}
