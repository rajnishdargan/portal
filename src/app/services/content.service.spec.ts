import { TestBed } from '@angular/core/testing';
import { ContentService } from './content.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
describe('ContentService', () => {
  let service: ContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.get(ContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
