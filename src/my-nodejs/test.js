var React = require('react'),
    mui = require('@material-ui/core'),
    Paper = mui.Paper,
    Toolbar = mui.Toolbar,
    ToolbarGroup = mui.ToolbarGroup,
    DropDownMenu = mui.DropDownMenum
    TextFiel = mui.TextField,
    FlatButton = mui.FlatButtonm,
    Snackbar = mui.Snackbar;
 
var menuItemsIwant = [
  { payload: '1', text: '[Select a finacial purpose]' },
  { payload: '2', text: 'Every Night' },
  { payload: '3', text: 'Weeknights' },
  { payload: '4', text: 'Weekends' },
  { payload: '5', text: 'Weekly' }
];
var menuItemsIcan = [
  { payload: '1', text: '[Select an objective]' },
  { payload: '2', text: 'Every Night' },
  { payload: '3', text: 'Weeknights' },
  { payload: '4', text: 'Weekends' },
  { payload: '5', text: 'Weekly' }
];
var menuItemsHousing = [
  { payload: '1', text: '[Select housing]' },
  { payload: '2', text: 'Every Night' },
  { payload: '3', text: 'Weeknights' },
  { payload: '4', text: 'Weekends' },
  { payload: '5', text: 'Weekly' }
];
var menuItemsIlive = [
  { payload: '1', text: '[Select family mambers]' },
  { payload: '2', text: 'Every Night' },
  { payload: '3', text: 'Weeknights' },
  { payload: '4', text: 'Weekends' },
  { payload: '5', text: 'Weekly' }
];
var menuItemsLifestyle = [
  { payload: '1', text: '[Select lifestyle]' },
  { payload: '2', text: 'Every Night' },
  { payload: '3', text: 'Weeknights' },
  { payload: '4', text: 'Weekends' },
  { payload: '5', text: 'Weekly' }
];
var menuItemsLifestyle2 = [
  { payload: '1', text: '[Select savings]' },
  { payload: '2', text: 'Every Night' },
  { payload: '3', text: 'Weeknights' },
  { payload: '4', text: 'Weekends' },
  { payload: '5', text: 'Weekly' }
];
var menuItemsIncome = [
  { payload: '1', text: '[Select your yearly income]' },
  { payload: '2', text: 'Every Night' },
  { payload: '3', text: 'Weeknights' },
  { payload: '4', text: 'Weekends' },
  { payload: '5', text: 'Weekly' }
];
var Content = React.createClass({

  getInitialState: function() {
    return {
      //formData: {
      //  name: '',
      //  age: '',
      //  city: '',
      //  state: ''
      //},
      errorTextName: '',
      errorTextAge: '',
      errorTextCity: '',
      errorTextState: ''
    };
  },

  render: function() {

    return (
      <div className="container-fluid">
        <div className="row color-bg"></div>
        <div className="row main-bg">
          <div className="container">
            <div className="mui-app-content-canvas page-with-nav">
              <div className="page-with-nav-content">

                <Paper zDepth={1}>

                  <h2 className="title-h2">Now, what would you like to do?</h2>

                  <Toolbar>
                    <ToolbarGroup key={1} float="right">
                      <span>I want to</span>
                      <DropDownMenu
                        className="dropdown-long"
                        menuItems={menuItemsIwant}
                        //autoWidth={false}
                      />
                    </ToolbarGroup>
                  </Toolbar>

                  <div className="clearfix"></div>

                  <Toolbar>
                    <ToolbarGroup key={2} float="right">
                      <span>So I can</span>
                      <DropDownMenu
                        className="dropdown-long"
                        menuItems={menuItemsIcan}
                        //autoWidth={false}
                      />
                    </ToolbarGroup>
                  </Toolbar>

                  <h2 className="title-h2">Please, share a little about you.</h2>

                  <div className="clearfix"></div>

                  <Toolbar>
                    <ToolbarGroup key={3} float="right">
                      <span>I am</span>
                      <TextField
                        id="name"
                        className="text-field-long"
                        ref="textfield"
                        hintText="Full name"
                        errorText={this.state.errorTextName}
                        onChange={this._handleErrorInputChange}
                      />
                      <span>and I am</span>
                      <TextField
                        id="age"
                        className="text-field-short"
                        ref="textfield"
                        hintText="00"
                        errorText={this.state.errorTextAge}
                        onChange={this._handleErrorInputChange}
                      />
                      <span className="span-right-measure">years of age.</span>
                    </ToolbarGroup>
                  </Toolbar>

                  <div className="clearfix"></div>

                  <Toolbar>
                    <ToolbarGroup key={4} float="right">
                      <span>I</span>
                      <DropDownMenu
                        hintText="I"
                        menuItems={menuItemsHousing}
                        //autoWidth={false}
                      />
                      <span>in</span>
                      <TextField
                        id="city"
                        ref="textfield"
                        className="text-field-long"
                        hintText="City"
                        errorText={this.state.errorTextCity}
                        onChange={this._handleErrorInputChange}
                      />
                      <span>,</span>
                      <TextField
                        id="state"
                        ref="textfield"
                        className="text-field-short text-field-right-measure"
                        hintText="ST"
                        errorText={this.state.errorTextState}
                        onChange={this._handleErrorInputChange}
                      />
                    </ToolbarGroup>
                  </Toolbar>

                  <div className="clearfix"></div>

                  <Toolbar>
                    <ToolbarGroup key={5} float="right">
                      <span>Where I live</span>
                      <DropDownMenu
                        className="dropdown-long"
                        menuItems={menuItemsIlive}
                        //autoWidth={false}
                      />
                    </ToolbarGroup>
                  </Toolbar>

                  <div className="clearfix"></div>

                  <Toolbar>
                    <ToolbarGroup key={6} float="right">
                      <span>My lifestyle is</span>
                      <DropDownMenu
                        className="dropdown-short"
                        menuItems={menuItemsLifestyle}
                        //autoWidth={false}
                      />
                      <span>and I've saved</span>
                      <DropDownMenu
                        className="dropdown-short"
                        menuItems={menuItemsLifestyle2}
                        //autoWidth={false}
                      />
                    </ToolbarGroup>
                  </Toolbar>

                  <div className="clearfix"></div>

                  <Toolbar>
                    <ToolbarGroup key={7} float="right">
                      <span>My yearly household is about</span>
                      <DropDownMenu
                        className="dropdown-mobile"
                        menuItems={menuItemsIncome}
                        //autoWidth={false}
                      />
                    </ToolbarGroup>
                  </Toolbar>

                  <div className="clearfix"></div>

                  <div className="button-place">
                    <FlatButton
                      onTouchTap={this._handleClick}
                      label="I'm done lets go!"
                    />

                    <Snackbar
                      ref="snackbar"
                      message="Invalid input, please check and try again"
                    />
                  </div>

                </Paper>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  _handleErrorInputChange: function(e) {
    if (e.target.id === 'name') {
      var name = e.target.value;
      this.setState({
        //name: name,
        errorTextName: e.target.value ? '' : 'Please, type your Name'
      });
    } else if (e.target.id === 'age') {
      var age = e.target.value;
      this.setState({
        //age: age,
        errorTextAge: e.target.value ? '' : 'Check Age'
      });
    } else if (e.target.id === 'city') {
      var city = e.target.value;
      this.setState({
        //city: city,
        errorTextCity: e.target.value ? '' : 'Type City'
      });
    } else if (e.target.id === 'state') {
      var state = e.target.value;
      this.setState({
        //state: state,
        errorTextState: e.target.value ? '' : 'Type State'
      });
    }
  },

  _handleClick: function(e) {
    this.refs.snackbar.show();
    //TODO: find a way to change errorText for all empty TextField
    if (this.refs.textfield && this.refs.textfield.getValue().length === 0) {
      this.setState({
        errorTextState: 'Type State',
        errorTextCity: 'Type City',
        errorTextAge: 'Check Age',
        errorTextName: 'Please, type your Name'
      });
    }
  }

});

module.exports = Content;
    
console.log("good");
