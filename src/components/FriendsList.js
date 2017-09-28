import React from 'react'
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import './FriendsList.css'

export default class FriendsList extends React.Component {
  constructor () {
    super()

    this.state = {
      friends: []
    }
  }

  componentDidMount () {
    window.FB.api('/me/friends', {fields: 'name,picture'}, resp => {
      this.setState({friends: resp.data})
    })
  }

  isCollaborator (fbuser) {
    return this.props.collaborators.indexOf(fbuser.id) > -1
  }

  toggleCollaborator = (fbuser) => {
    const { onAddCollaborator, onRemoveCollaborator } = this.props
    this.isCollaborator(fbuser) ? onRemoveCollaborator(fbuser.id) : onAddCollaborator(fbuser.id)
  }

  render() {
    const { listName } = this.props

    return (
      <div className="FriendsList">
        <Toolbar className="FriendsList__Title">
          <Typography type="body2">
            Allow friends who have connected GroceryBLISS to edit "{listName}"
          </Typography>
        </Toolbar>
        <List>
          {this.state.friends.map(friend => (
            <ListItem key={friend.id} dense button onClick={() => this.toggleCollaborator(friend)}>
              <Avatar alt={friend.name} src={friend.picture.data.url} />
              <ListItemText primary={friend.name} />
              <ListItemSecondaryAction>
                <Checkbox
                  onChange={() => this.toggleCollaborator(friend)}
                  checked={this.isCollaborator(friend)}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    )
  }
}