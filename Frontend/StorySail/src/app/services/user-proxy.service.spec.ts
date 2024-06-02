import { TestBed } from '@angular/core/testing';

import { UserProxyService } from './user-proxy.service';

describe('UserProxyService', () => {
  let service: UserProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
