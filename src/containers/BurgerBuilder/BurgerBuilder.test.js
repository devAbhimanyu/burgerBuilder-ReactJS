import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BurgerBuilder} from './BurgerBuilder';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />',()=>{
    let wrapper = null;
    beforeEach(()=>{
         wrapper = shallow(<BurgerBuilder  onInitIngredientFetch={()=>{}}/>);
    })

    it('should render  <BurgerControls /> elements if ingredient present',()=>{
        wrapper.setProps({ingredientRED:{salad:1}});
        expect(wrapper.find(BurgerControls)).toHaveLength(1);
    });


})