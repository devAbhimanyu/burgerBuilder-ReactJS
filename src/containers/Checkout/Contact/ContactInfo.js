import React,{Component} from 'react';
import {connect} from 'react-redux';
import classes from './ContactInfo.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/CustomInputs/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actionCreater from '../../../store/actions/index';
import {updateObject} from '../../../shared/utility';
import {checkValidity} from '../../../shared/validations';

class ContactInfo extends Component{
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation:{},
                valid: true
            }
        },
        formIsValid: false,
    }

    orderClickHandler =(event)=>{
        event.preventDefault();
        const orderData ={};

        for(let key in this.state.orderForm){
            orderData[key] = this.state.orderForm[key].value;
        }

       //this.setState({loading:true});
       const order ={
           ingredients : this.props.ingredientsRED,
           price : this.props.totalPriceRED.toFixed(2),
           orderData:orderData,
           userId:this.props.userIdRED
       }
       this.props.onBurgerOrder(order,this.props.tokenRed);     
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement =updateObject(this.state.orderForm[inputIdentifier],{
            value:event.target.value,
            valid:checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched:true
        })

        const updatedOrderForm = updateObject(this.state.orderForm,{[inputIdentifier]:updatedFormElement})
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }


    render(){
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let inputElements =formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))

        let form= (
            <form onSubmit={this.orderClickHandler}>
                {inputElements}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
            </form>
        );
        if(this.props.loadingRED){
            form = <Spinner />;
        }
        return(
            <div className={classes.ContactInfo}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps =state =>{
    return{
        ingredientsRED:state.burgerReducer.ingredients,
        totalPriceRED:state.burgerReducer.totalPrice,
        loadingRED: state.orderReducer.loading,
        tokenRed:state.authenticationReducer.token,
        userIdRED:state.authenticationReducer.userId
    }
}

const mapDispatchToProps = dispatch =>{
   return{
        onBurgerOrder:(orderData,token)=>dispatch(actionCreater.purchaseBurger(orderData,token))
   } 
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactInfo,axios));
