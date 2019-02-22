import React      from 'react';

import { inject, observer } from 'mobx-react'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl      from '@material-ui/core/FormControl';
import Radio      from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const override = { label: 'FormLabelTypography' }

class RadioButtonsGroup extends React.Component {
  state = {value: 'start_order' }

  render() {
    let checked = this.props.rootStore.uistate.get('resultsSettingsSortParam') || 'nation'
    return (
      <FormControl style={{ marginLeft: '2rem' }} >
          <RadioGroup
            value={checked}
            onChange={this.handleChange}
          >
            <FormControlLabel control={<Radio />} classes={override} value='nation'      label="Nation" />
            <FormControlLabel control={<Radio />} classes={override} value='start_order' label="Start Order" />
            <FormControlLabel control={<Radio />} classes={override} value='result_rank' label="Rank" />
          </RadioGroup>
        </FormControl>
    );
  }

  handleChange = (e) => {
    this.props.rootStore.setUIState({ resultsSettingsSortParam: e.target.value })
  }
}

export default inject('rootStore')(observer(RadioButtonsGroup))
