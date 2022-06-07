import { getRandomSlackUser } from '../../src/utils/helper';

describe('getRandomSlackUser', () =>{
  it('', ()=>{
    expect(getRandomSlackUser('@test')).toBe('@test');
  })
})
