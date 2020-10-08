import * as React from 'react';
import Enzyme,{shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from './Login';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
Enzyme.configure({ adapter: new Adapter() });
describe('Test when form is submitted', () => {
    it('should submit form data', () => {
        const testValues = {
            username: 'mno',
            password: 'mno',
        };
        let form = shallow(<Login />); 
        form.instance().handleSubmit = jest.fn();
        form.instance().handleSubmit();
        form.update(); 
        form.find('#loginsubmit').simulate('submit');


        expect(form.find('#loginsubmit').length).toEqual(1);
        expect(form.instance().handleSubmit).toHaveBeenCalled();
        // expect(form.instance().handleSubmit.toHaveBeCalledWith({username: testValues.username, password: testValues.password});
    });
    
    it('renders correctly', () => {
        const tree = renderer.create(<BrowserRouter><Login/></BrowserRouter>).toJSON();
        expect(tree).toMatchSnapshot();
      });
});
