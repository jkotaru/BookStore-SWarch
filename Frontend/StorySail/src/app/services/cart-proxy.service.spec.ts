import { TestBed } from '@angular/core/testing';

import { CartProxyService } from './cart-proxy.service';

describe('CartProxyService', () => {
  let service: CartProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
