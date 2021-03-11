import React, { Component, createRef, forwardRef } from 'react';

const FocusInput = forwardRef((props, ref) => (
    <input type="text" ref={ref} />
));

class ForwardRef extends Component {
    constructor(props) {
        super(props);
        this.ref = createRef();
    }

    componentDidMount() {
        const { current } = this.ref;
        current.focus();
    }

    render() {
        return (
            <div>
                <p>forward ref</p>
                <FocusInput ref={this.ref} />
            </div>
        );
    }
}
export default ForwardRef;

