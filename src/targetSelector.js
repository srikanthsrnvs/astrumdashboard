import React, {Component, useRef} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    selectionHeader: {
        marginTop: '40px'
    }
});


class TargetSelector extends Component{

    constructor(props){
        super(props)
        this.state = {
            target : props.target,
            features : props.features
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        this.setState({target: e.target.value})
        this.props.onSelection(e.target.value)
    }

    render(){
        const labelWidth = 0
        const {classes} = this.props;

        var choices = []
        for(var i=0; i<this.state.features.length; i++){
            var feature = this.state.features[i]
            choices.push(<MenuItem key={i} value={feature}>{feature}</MenuItem>)
        }
        return(
            <div>
                <h3 className={classes.selectionHeader}>Select the target</h3>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel ref={this.inputLabel} id="demo-simple -select-outlined-label" />
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.target}
                        onChange={this.handleChange}
                        labelWidth={labelWidth}
                    >
                        {choices}
                    </Select>
                </FormControl>
            </div>
        )
    }
}

export default withStyles(styles)(TargetSelector)