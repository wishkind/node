import React, {useState, useRef, useEffect} from 'react';
import { makeStyles,withStyles,createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { purple,green } from '@material-ui/core/colors';
import Menu from '@material-ui/core/Menu';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import CircleIcon from '@material-ui/icons/FiberManualRecord';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import DoneIcon from '@material-ui/icons/Done';
import { isMobile } from 'react-device-detect';
import {useUpdateNetwork} from './contexts/Network.js'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  btnIcon:{
      fontSize: 15,
      height:40,
      fontWeight: "solid",
      border: 2,
      borderRadius: 25,
      borderStyle: "solid",
      borderColor: "black"
  },
  btnContext:{
     marginTop: theme.spacing(-0.7),
  },
  btnText:{
      position:'relative',
      top:theme.spacing(-1),
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    //此处是将背景设置为黑色，此时菜单里的面文字要设置成白色
     backgroundColor: '#111111ee',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
  //这一段是设置菜单获取焦点时的颜色，暂时不用
  //   '&:focus': {
  //     backgroundColor: "#b2dfdb",
  //     // '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
  //     //   color: theme.palette.common.white,
  //     //   backgroundColor:theme.palette.common.white,
  //     // },
  //   },
    marginTop:theme.spacing(isMobile ? 0 : 1)
  },

}))(MenuItem);

const colorType = {
    'homestead':'primary',
    'ropsten':'secondary',
    'rinkeby':'action',
    'kovan':'error',
    'localhost':'inherit',
}

const custom_theme = createMuiTheme({
  palette: {
      primary:{
          main:green[500]
      },
      secondary:{
          main:purple[500],
      },
  },
});
export const NET_WORKS_NAME = [
    '网络',
    '以太坊主网络',
    'Ropsten测试网络',
    'Rinkeby 测试网络',
    'Kovan 测试网络',
    'Localhost 8545'
];

export const NET_WORKS = [
    'network',
    'homestead',
    'ropsten',
    'rinkeby',
    'kovan',
    'localhost'
]

function MenuBtn() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [selectedIndex,setSelectedIndex] = useState(1)
    const anchorRef = useRef(null);
    const prevOpen = useRef(open);
    const updateNetwork = useUpdateNetwork()

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };
    const handleSelected = key => () => {
        if(selectedIndex === key) {
            return;
        }
        setSelectedIndex(key)
        setOpen(false);
        updateNetwork(NET_WORKS[key])
    };
    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    useEffect(()=>{
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    },[open])

    function showMenuItem() {
        return NET_WORKS_NAME.map((net,key)=> showOneItem(net,key))
    }

    function showOneItem(net,key) {
        let menuPos = key === 0 ? {textAlign:'center'} : {textAlign:"left"}
        let _color = colorType[NET_WORKS[key]];
        return (
            <StyledMenuItem
                key={net}
                disabled={key===0}
                selected={key===selectedIndex}
                onClick={handleSelected(key)}
            >
                {key !== 0 && <DoneIcon color='primary' visibility={selectedIndex === key ? "show" : "hidden"}/>}
                {key !== 0 && <CircleIcon color={_color}/>}
                <div style={{width:"100%",...menuPos}}>
                    {net}
                    {key===0 && <Divider/>}
                </div>
            </StyledMenuItem>
        )
    }

    return (
        <div className={classes.root}>
            <IconButton
              className={classes.btnIcon}
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
                <div className={classes.btnContext}>
                    <CircleIcon color={colorType[NET_WORKS[selectedIndex]]} />
                        <span className={classes.btnText}>
                           {NET_WORKS_NAME[selectedIndex]}
                        </span>
                    <DownIcon  color={colorType[NET_WORKS[selectedIndex]]}/>
                </div>
            </IconButton>
            <ThemeProvider theme={custom_theme}>
                <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorRef.current}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    onKeyDown={handleListKeyDown}
                >
                    {showMenuItem()}
                </StyledMenu>
            </ThemeProvider>

      </div>
    )
}

export default MenuBtn

