import React    from 'react';

import ExpansionPanel        from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import Avatar from '@material-ui/core/Avatar';


const AExpansionBar = (props) => {
  return (
    <div >
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div>Location</div>
          <div>Select trip destination</div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>
            <Chip label="Barbados"  onDelete={() => {}} />
          </div>
          <div>Select your destination of choice
              <a href="#sub-labels-and-columns" >
                Learn more
              </a>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary">Save</Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  )
}

const handleClick = (e) => {  }

const ExpansionBar = (props) => {
  return ( 
    <div style={{ height: 32, padding: 16 }}>
    <Chip
        avatar={<Avatar>CA</Avatar>}
        label="Category__"
        onClick={handleClick} />
    <Chip
        avatar={<Avatar>RT</Avatar>}
        label="Route_____"
        onClick={handleClick} />
    </div>
  )}

export default ExpansionBar
