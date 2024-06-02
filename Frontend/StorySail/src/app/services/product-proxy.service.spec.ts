import { TestBed } from '@angular/core/testing';

import { ProductProxyService } from './product-proxy.service';

describe('ProductProxyService', () => {
  let service: ProductProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
