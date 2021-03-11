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


async function login(req, res, next) {
  let mockAPI = new Promise((resolve, reject) => {
    setTimeout(() => {
      let userInfo = {
        name: 'Andy',
        age: '38',
        title: 'kaifa'
      };
      resolve(userInfo);
    }, 2000);
  });

  let account = await mockAPI;
  console.log(account)
  return res.status(200).json(account);
}

async function logout(req, res, next) {
  res.status(200).send();
}

module.exports.login = login;
module.exports.logout = logout;


