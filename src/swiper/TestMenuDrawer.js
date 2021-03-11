import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  toggleDrawer = () => this.setState({ open: !this.state.open })

  render() {
    return (
      <div>
        <AppBar
          title="Title"
        />
        <Drawer
          docked={false}
          width={300}
          onRequestChange={this.toggleDrawer}
          open={this.state.open}
        >
          <AppBar title="Title"  />
          <MenuItem
            primaryText="home"
            containerElement={<Link to="/" />}
            onTouchTap={() => {
              console.log('going home')
              alert('going home!')
              this.toggleDrawer()
            }}
          />
          <MenuItem
            primaryText="about"
            containerElement={<Link to="/about" />}
            onTouchTap={() => {
              console.log('about')
              alert('going to about page!')
              this.toggleDrawer()
            }}
          />
        </Drawer>

        <div style={{ textAlign: 'center' }}>
          {this.props.children}

          <Button
            aria-label="Toggle Drawer"
            onTouch={this.toggleDrawer}
          />
        </div>

      </div>
    )
  }
}

export default App
