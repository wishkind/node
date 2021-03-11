import React from 'react';
import copy from 'copy-to-clipboard';

export default class TextCopy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.copyToClipboard}> button </button>
        <input type="text" value={this.content} onChange={this.inputChanged} />
      </div>
    )
  }

  copytoClipboard = () => {
    copy(this.state.content)

  }

  inputChanged = e => {
    console.log(`e.target.value=${e.target.value}`)
    this.setState({content:e.target.value})
  }
}

