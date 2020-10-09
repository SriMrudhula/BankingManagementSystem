import * as React from 'react';
import Enzyme,{shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import Deposit from './Deposit';
Enzyme.configure({ adapter: new Adapter() });
describe('Test when form is submitted', () => {
    it('should submit form data', () => {
        localStorage.setItem("id",10);
        let form = shallow(<Deposit/>); 
        form.instance().handleSubmit = jest.fn();
        form.instance().handleSubmit();
        form.update();                                                   
        form.find('#depositsubmit').simulate('submit');
        expect(form.find('#depositsubmit').length).toEqual(1);
        expect(form.instance().handleSubmit).toHaveBeenCalled();
    });    
    it('renders correctly', () => {
        const tree = renderer.create(<BrowserRouter><Deposit/></BrowserRouter>).toJSON();
        expect(tree).toMatchSnapshot();
      });
});
