import React from 'react';
import PropTypes from 'prop-types';

import IconButton from 'material-ui/IconButton';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import Avatar from 'material-ui/Avatar';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import ShareIcon from 'material-ui-icons/Share';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ThumbDown from 'material-ui-icons/ThumbDown';
import red from 'material-ui/colors/red';
import bg from 'material-ui/colors/blueGrey';
import Badge from 'material-ui/Badge';
// Import Style
import styles from './NoteGridItem.css';
import { requestNoteUpvote, requestNoteDownvote } from '../../NoteActions';

function getInitials(string) {
  if (!string ) {
    string = 'Unknown'
  }
  const names = string.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
}

function truncate(string,maxLen){
  if (string.length > maxLen)
     return string.substring(0,maxLen)+'...';
  else
     return string;
};

class NoteGridItem extends React.Component {

  handleUpvoteClick = (e) => {
    const { id } = this.props.note;
    this.props.dispatch(requestNoteUpvote(id))
  }

  handleDownvoteClick = (e) => {
    const { id } = this.props.note;
    this.props.dispatch(requestNoteDownvote(id))
  }

  render() {
    return (
      <div>
        <Card className={styles.card}>
          <CardHeader
            onClick={() => { this.props.requestEditor(true, this.props.note); }}
            avatar={<Avatar aria-label={this.props.note.owner} className={styles.avatar}>{getInitials(this.props.note.owner.fullname)}</Avatar>}
            title={truncate(this.props.note.title,30)}
            subheader={`created by ${this.props.note.owner.fullname}`}
          />
          <CardContent>
            <div className={styles.truncate} dangerouslySetInnerHTML={{ __html: this.props.note.content }} />
          </CardContent>
          <CardActions className={styles.action}>
            <IconButton onClick={this.handleUpvoteClick}>
              <Badge
                className={styles.badge}
                badgeContent={this.props.note.meta.upvotes.length}
                color="primary">
                <ThumbUp />
              </Badge>
            </IconButton>
            <IconButton onClick={this.handleDownvoteClick}>
              <Badge
                className={styles.badge}
                badgeContent={this.props.note.meta.downvotes.length}
                color="primary"
              >
                <ThumbDown />
              </Badge>
            </IconButton>
          { /*<IconButton>
              <ShareIcon />
            </IconButton>*/
          }
            <IconButton>
              <ModeEditIcon onClick={() => { this.props.requestEditor(true, this.props.note); }} />
            </IconButton>
          </CardActions>
        </Card>
       { /* <Button fab color="accent" aria-label="edit" className={styles.edit_button}>
          <ModeEditIcon />
    </Button> */ }
      </div>
    );
  }
}

NoteGridItem.propTypes = {
  note: PropTypes.shape({
    owner: PropTypes.shape({
      fullname: PropTypes.string,
      username: PropTypes.string,
    }),
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    isPrivate: PropTypes.bool,
    id: PropTypes.number.isRequired,
    LastModified: PropTypes.number.isRequired,
  }).isRequired,
  requestEditor: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
};

export default NoteGridItem;
