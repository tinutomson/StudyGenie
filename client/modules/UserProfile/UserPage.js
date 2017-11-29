import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import NoteIcon from 'material-ui-icons/InsertDriveFile';
import BorderIcon from 'material-ui-icons/BorderAll';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    height: 151,
  },
  dividers: {
    maxWidth: '360px',
    background: theme.palette.background.paper,
  },
});

function PaperSheet(props) {
  const { classes } = props;
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography type="headline">FirstName LastName</Typography>
              <Typography type="subheading" color="secondary">
              user14@gmail.com
              </Typography>
              <CardMedia
                className={classes.cover}
                image="https://i.stack.imgur.com/IHLNO.jpg"
              />
            </CardContent>
          </div>
          <List className={classes.dividers}>
            <ListItem button>
              <Avatar>
                <NoteIcon />
              </Avatar>
              <ListItemText primary="Notes Added" secondary="Private:12 Public:14" />
            </ListItem>
            <Divider inset />
            <ListItem button>
              <Avatar>
                <BorderIcon />
              </Avatar>
              <ListItemText primary="Cheatsheets" secondary="1" />
            </ListItem>
          </List>
        </Card>
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
