import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Input from '../../components/UI/CustomInputs/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Authentication.css';
import * as actionDelegates from '../../store/actions/index';
import {updateObject} from '../../shared/utility';
import {checkValidity} from '../../shared/validations';

class Authorization extends Component{
    state={
        formControls:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'enter e-mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail:true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'enter password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid:false,
        isSignup:true
    }

    componentDidMount(){
        if(!this.props.buildingRed && this.props.postAuthPathRED !== '/'){
            this.props.postAuthenticationPathDelegate();
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedSignUpForm = updateObject(this.state.formControls,{
            [inputIdentifier]:updateObject(this.state.formControls[inputIdentifier],{
                value:event.target.value,
                valid: checkValidity(event.target.value,this.state.formControls[inputIdentifier].validation),
                touched:true
            })   
        });
        let formIsValid = true;
        for (let inputIdentifier in updatedSignUpForm) {
            formIsValid = updatedSignUpForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({formControls: updatedSignUpForm, formIsValid: formIsValid});
    }

    onSignUpHandler =(event)=>{
        event.preventDefault();
        this.props.authenticateDelegate(this.state.formControls.email.value, this.state.formControls.password.value,this.state.isSignup);        
    }

    switchAuthModeHandler =() =>{
        this.setState(prevState=>{
            return{isSignup: !prevState.isSignup}
        })
    }


    render(){
        const formElementsArray = [];
        for (let key in this.state.formControls) {
            formElementsArray.push({
                id: key,
                config: this.state.formControls[key]
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
        ));

        if(this.props.loadingRED){
            inputElements= <Spinner />
        }

        let errorMessage =null;
        if(this.props.errorRED){
            errorMessage= <p>{this.props.errorRED.message}</p>;
        }

        let userAuthernticated = null;
        if(this.props.authenticated){
                userAuthernticated=<Redirect to={this.props.postAuthPathRED} />
        }

        return(
            <React.Fragment>
                {userAuthernticated}
                <div className={classes.Authentication}>
                    {errorMessage}
                    <form onSubmit={this.onSignUpHandler}> 
                        {inputElements}
                        <Button btnType="Success" disabled={!this.state.formIsValid}>{this.state.isSignup?'SignUp':'SignIn'}</Button>
                    </form>
                    <Button clickHandler={this.switchAuthModeHandler} btnType="Success" >Switch To {this.state.isSignup?'SignIn':'SignUp'}</Button>
                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state=>{
    return{
        loadingRED:state.authenticationReducer.loading,
        errorRED:state.authenticationReducer.error,
        authenticated:state.authenticationReducer.token !== null,
        buildingRed:state.burgerReducer.building,
        postAuthPathRED:state.authenticationReducer.postAuthPath
    }
}

const mapDispactchToProps =dispatch =>{
    return{
        authenticateDelegate: (email,password,isSignUp)=>dispatch(actionDelegates.authenticate(email,password,isSignUp)),
        postAuthenticationPathDelegate:() => dispatch(actionDelegates.postAuthenticationPath('/'))
    }
}

export default connect(mapStatetoProps,mapDispactchToProps)(Authorization);