import React , { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Gravatar from 'react-awesome-gravatar';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AuthContext from "../../context/auth-context";

import EventDetails from "./EventDetails";

const useStyles = makeStyles({
  root: {
    width: 500,
    marginTop: 10,
    margin: "0 auto"
  },
  inline: {
    display: 'inline',
  }
});

const ListEvents = (props) => {
  const classes = useStyles();
  const authContext = useContext(AuthContext)
  return (
    <List className={classes.root}>
      {props.events.map(event =>
        <React.Fragment key={event._id}>
          <ListItem>
            <ListItemAvatar>
              <Gravatar email={event.creator.email}>
                { url => (<Avatar src={url} />) }
              </Gravatar>
            </ListItemAvatar>
            <ListItemText primary={event.title} secondary={new Date(event.date).toGMTString()} />
            {authContext.token && <ListItemSecondaryAction>
              <EventDetails
                event={event} />
            </ListItemSecondaryAction>}
            {!authContext.token && <ListItemSecondaryAction>
              <Button
                variant="text"
                color="primary"
                size="small"
                edge="end"
                startIcon={<AttachMoneyIcon />}
              >
                {event.price}
              </Button>
            </ListItemSecondaryAction>}
          </ListItem>
        </React.Fragment>
      )}
    </List>
  );
}

export default ListEvents