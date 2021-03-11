import React, {useState, useRef, useEffect} from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { purple,green,blue,red,grey} from '@material-ui/core/colors';
import Menu from '@material-ui/core/Menu';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import CircleIcon from '@material-ui/icons/FiberManualRecord';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import DoneIcon from '@material-ui/icons/Done';
import { isMobile } from 'react-device-detect';
import { NET_WORKS,NET_WORKS_NAME } from '../../constants';
import {useGlobal,useUpdateGlobal} from 'contexts/GlobalProvider.js'
import { ethers } from 'ethers'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  iconColor1:{
      color:green[500],
  },
  iconColor2:{
      color:blue[500],
  },
  iconColor3:{
      color:red[500],
  },
  iconColor4:{
      color:purple[500],
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
     marginTop: theme.spacing(0.4),
  },
  btnText:{
      //使用相对位置来调整top\bottom等属性
      position:'relative',
      top:theme.spacing(-0.9),
  },
  dividerRoot:{
      backgroundColor:grey[500]
  }
}));

//自定义菜单
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    backgroundColor:"#000000BB",
    color:grey[400]
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

//自定义菜单项，只有在组件API样式表规则里的属性才能自定义
const StyledMenuItem = withStyles(theme => ({
    root: {
        marginTop:theme.spacing(isMobile ? 0 : 1),
    },
    selected:{
        fontWeight:"bold",
        color:"white",
    }
}))(MenuItem);

function MenuBtn() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const {network} = useGlobal()
    const updateGlobal = useUpdateGlobal()
    const [selectedIndex,setSelectedIndex] = useState(NET_WORKS.indexOf(network))
    const anchorRef = useRef(null);
    const prevOpen = useRef(open);

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };
    const handleSelected = key => () => {
        if(key === 0 || selectedIndex === key) {
            return;
        }
        setSelectedIndex(key)
        setOpen(false);
        updateGlobal({
            tokenSelectedIndex:0,
            network:NET_WORKS[key],
            provider:new ethers.providers.InfuraProvider(NET_WORKS[key],"fda03bb99a764dca90b2400ecff9ef5a"),
        })
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
    function showMenuItem() {
        return NET_WORKS_NAME.map((net,key)=> showOneItem(net,key))
    }
    function showOneItem(net,key) {
        let menuPos = key === 0
            ? {textAlign:'center',color:"white"}
            : {textAlign:"left"}
        return (
            <StyledMenuItem
                key={net}
                disabled={key===0}
                selected={key===selectedIndex}
                onClick={handleSelected(key)}
            >
                {key !== 0 && <DoneIcon  visibility={selectedIndex === key ? "show" : "hidden"}/>}
                {key !== 0 && <CircleIcon className={classes['iconColor' + key]}/>}
                <div style={{width:"100%",...menuPos}}>
                    {key === 0  && <span style={{fontWeight:"bold"}}>{net}</span>}
                    {key !== 0 && <span>{net}</span>}
                    {key===0 && <Divider classes={{root:classes.dividerRoot}} />}
                </div>
            </StyledMenuItem>
        )
    }

    useEffect(()=>{
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    },[open])

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
                    <CircleIcon className={classes['iconColor' + selectedIndex]} />
                        <span className={classes.btnText}>
                           {NET_WORKS_NAME[selectedIndex]}
                        </span>
                    <DownIcon  className={classes['iconColor' + selectedIndex]}/>
                </div>
            </IconButton>
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
      </div>
    )
}

export default MenuBtn
