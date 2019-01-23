import React, { Component } from 'react';

const lazyLoader = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount () {
            importComponent()
                .then(cmp => {
                    this.setState({component: cmp.default});
                });
        }
        
        render () {
            const custComponent = this.state.component;

            return custComponent ? <custComponent {...this.props} /> : null;
        }
    }
}

export default lazyLoader;
