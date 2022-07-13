import { TestBed } from '@angular/core/testing';
import { ActionService } from './action.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
xdescribe('ActionService', () => {
  let service: ActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(ActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
