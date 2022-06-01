import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { QumlPlayerConfig } from '@project-sunbird/sunbird-quml-player-v9/lib/quml-library-interface';
import { NavigationService } from 'src/app/services/navigation.service';
import { QuestionCursorImplementationService } from 'src/app/services/question-cursor-implementation.service';
import { EditConfigurationComponent } from '../edit-configuration/edit-configuration.component';
import { SamplePlayerData } from './player-data';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  playerConfig: QumlPlayerConfig;
  editConfig = {
    showFeedback: '',
    showSubmitConfirmation: '',
    summaryType: '',
    showTimer: '',
  };
  constructor(
    private questionSetService: QuestionCursorImplementationService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    public navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.getContent(params.id);
    });
  }

  getContent(identifier: string): void {
    this.questionSetService.getQuestionSet(identifier).subscribe(res => {
      this.initializePlayer(res);
      this.setConfig();
    });
  }

  initializePlayer(metadata): void {
    this.playerConfig = {
      context: SamplePlayerData.playerConfig.context,
      config: SamplePlayerData.playerConfig.config,
      metadata,
      data: {}
    };
  }

  setConfig(): void {
    this.editConfig.showFeedback = this.playerConfig.metadata.children.every(child => child.showFeedback === 'Yes') ? 'Yes' : 'No';
    this.editConfig.showSubmitConfirmation = this.playerConfig.metadata.requiresSubmit ? this.playerConfig.metadata.requiresSubmit : '';
    this.editConfig.summaryType = this.playerConfig.metadata.summaryType ? this.playerConfig.metadata.summaryType : '';
    this.editConfig.showTimer = this.playerConfig.metadata.showTimer ? this.playerConfig.metadata.showTimer : '';
  }

  changeConfig(): void {
    const metadata = { ...this.playerConfig.metadata };
    this.playerConfig = undefined;
    setTimeout(() => {
      this.initializePlayer(metadata);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditConfigurationComponent, {
      data: {
        config: this.editConfig
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateConfig(result);
      }
    });
  }

  updateConfig(result): void {
    if (result.showFeedback) {
      if (result.showFeedback === 'Yes') {
        this.playerConfig.metadata.children.forEach(child => {
          child.showFeedback = 'Yes';
        });
      } else {
        this.playerConfig.metadata.children.forEach(child => {
          child.showFeedback = 'No';
        });
      }
    }

    if (result.showSubmitConfirmation) {
      this.playerConfig.metadata.requiresSubmit = result.showSubmitConfirmation;
    }

    if (result.summaryType) {
      this.playerConfig.metadata.summaryType = result.summaryType;
    }

    if (result.showTimer) {
      this.playerConfig.metadata.showTimer = result.showTimer;

      if (result.showTimer === 'Yes' && !this.playerConfig.metadata.timeLimits) {
        this.playerConfig.metadata.timeLimits = {
          maxTime: '120',
          warningTime: '10'
        };
      }
    }

    this.setConfig();
    this.changeConfig();
  }
}
