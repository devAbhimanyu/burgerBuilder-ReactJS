import React,{Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilary/Auxilary';
//import axios from '../../axios-orders';

const withErrorHandler = (WrappedComponenent,axios) =>{
    return class extends Component{
        state = {
            error:null
        }
        componentWillMount = () => {
            this.requestInterceptor = axios.interceptors.request.use(request =>{
                this.setState({error:null});
                return request;
            });
            
            this.responseInterceptor = axios.interceptors.response.use(res => res,error =>{
                this.setState({error:error});
            })
        }

        componentWillUnmount(){
            axios.interceptors.response.eject(this.responseInterceptor);
            axios.interceptors.request.eject(this.requestInterceptor);
        }

        erorConfirmedHandler =()=>{
                this.setState({error:null});
        }


        render(){
            return(
                <Aux>
                    <Modal show={this.state.error} closeModal={this.erorConfirmedHandler}>
                        {this.state.error?this.state.error.message:null}
                    </Modal>
                    <WrappedComponenent {...this.props} />
                </Aux>
            )
                
        }
    } 
}


export default withErrorHandler;