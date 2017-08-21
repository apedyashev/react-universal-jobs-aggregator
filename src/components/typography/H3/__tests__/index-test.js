import React from 'react';
import {shallow} from 'enzyme';
import H3 from '../index.js';

describe('H3', () => {
  it('renders h3 correctly', () => {
    const component = shallow(
      <H3 className="some-class">some text</H3>,
    );

    expect(component.text()).toEqual('some text');
    expect(component.hasClass('some-class')).toBeTruthy();
    expect(component.type()).toEqual('h3');
  });
});
