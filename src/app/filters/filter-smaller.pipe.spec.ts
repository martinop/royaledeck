/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { FilterBy } from './filter-smaller.pipe';

describe('Pipe: FilterSmaller', () => {
  it('create an instance', () => {
    let pipe = new FilterBy();
    expect(pipe).toBeTruthy();
  });
});
