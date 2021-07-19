import React from 'react';
import { shallow } from 'enzyme';

import SideMenu from './SideMenu';

describe('SideMenu', () => {
    test('should render', () => {
        expect(shallow(<SideMenu></SideMenu>)).toMatchSnapshot();
    });
});
