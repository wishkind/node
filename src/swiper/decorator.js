import React from 'react';
import MyContext from '../context.js';


function withUser(Component) {
    return class extends React.Component {
        render() {
            return (
                <MyContext.Comsumer>
                    {value => <Component user={value} {...this.props} />}
                </MyContext.Consumer>
            )
        }
    }
}


export default withUser;

