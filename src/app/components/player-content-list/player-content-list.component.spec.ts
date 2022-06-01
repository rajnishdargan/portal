import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerContentListComponent } from './player-content-list.component';

describe('PlayerContentListComponent', () => {
  let component: PlayerContentListComponent;
  let fixture: ComponentFixture<PlayerContentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerContentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerContentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
