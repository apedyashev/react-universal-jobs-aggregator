import React from 'react';
import {shallow} from 'enzyme';
import H4 from '../index.js';

describe('H4', () => {
  it('renders h4 correctly', () => {
    const component = shallow(
      <H4 className="some-class">some text</H4>,
    );

    expect(component.text()).toEqual('some text');
    expect(component.hasClass('some-class')).toBeTruthy();
    expect(component.type()).toEqual('h4');
  });
});
