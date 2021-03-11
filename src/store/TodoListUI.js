//ToDoListUI.js
import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
   },
}));

function ListItemLink(props) {
    return <ListItem button components="a" {...props} />;
}
export const TodoListUI = (props) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <div>
                <Input 
                    placeholder='add info'
                />
                <Button 
                    type="primary"
                >Add</Button>
            </div>
            <div>
               {/* <!--这里写list--> */}
            <div className={classes.root}>
              <List component="nav" aria-label="main">
                <ListItem button>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="inbox" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Drafts" />
                </ListItem>
              </List>
              <Divider />
              <List component="nav" aria-label="second">
                <ListItem button>
                  <ListItemText primary="Trash" />
                </ListItem>
                <ListItemLink href="#simpl">
                  <ListItemText primary="Spam" />
                </ListItemLink>
              </List> 
            </div> 
            </div>
        </React.Fragment>
    )
}


