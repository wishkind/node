import React from 'react';
import withUser from './decorator';


@withUser
class Son extends React.Component {

    constructor(props) {
        super(props);
        props.bindRef(this);
        this.el = document.querySelector('.box');
    }

    inputRef = null;

    fnRef = el => this.inputRef = el;

    focus = () => {
        this.inputRef.focus();
    }

    render() {
        return (
            <div>
                <div> {this.props.user.name}</div>
                <div> {this.props.user.age}</div>
                <input type="text" ref={this.fnRef}/>
                <button onClick={this.focus}>focus input </button>
            </div>
        )
    }
}

export default Son;
