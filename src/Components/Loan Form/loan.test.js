import * as React from 'react';
import Enzyme,{shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Loan from './Loan';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
Enzyme.configure({ adapter: new Adapter() });
describe('Test when form is submitted', () => {
    it('should submit form data', () => {
        localStorage.setItem("id",10);
        let form = shallow(<Loan/>); 
        form.instance().handleSubmit = jest.fn();
        form.instance().handleSubmit();
        form.update(); 
        form.find('#loansubmit').simulate('submit');
        expect(form.find('#loansubmit').length).toEqual(1);
        expect(form.instance().handleSubmit).toHaveBeenCalled();
    });
    it('renders correctly', () => {
        const tree = renderer.create(<BrowserRouter><Loan/></BrowserRouter>).toJSON();
        expect(tree).toMatchSnapshot();
      });
});
