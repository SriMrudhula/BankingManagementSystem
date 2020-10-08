import * as React from 'react';
import Enzyme,{shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import Register from './Register';
Enzyme.configure({ adapter: new Adapter() });
describe('Test when form is submitted', () => {
    it('should submit form data', () => {
        let form = shallow(<Register/>); 
        form.instance().handleSubmit = jest.fn();
        form.instance().handleSubmit();
        form.update(); 
        form.find('#registersubmit').simulate('submit');


        expect(form.find('#registersubmit').length).toEqual(1);
        expect(form.instance().handleSubmit).toHaveBeenCalled();
    });
    
    it('renders correctly', () => {
        const tree = renderer.create(<BrowserRouter><Register/></BrowserRouter>).toJSON();
        expect(tree).toMatchSnapshot();
      });
});
