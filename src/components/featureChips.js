import React, { Component } from 'react'
import Chip from '@material-ui/core/Chip'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { DialogContentText } from '@material-ui/core';
import PredictorDialog from './predictorDialog'

const chipStyle = {
    marginTop: '10px',
    marginRight: '5px'
}

const sectionTitle = {
    marginTop: '40px'
}


export default class FeatureChips extends Component{

    constructor(props){
        
        super(props);
        this.state = {
            features: props.features,
            showPredictorDialog: false
        }
        this.deleteFeature = this.deleteFeature.bind(this); 
    }

    deleteFeature(feature){
        var array = [...this.state.features]; // make a separate copy of the array
        for (var i=0; i<this.state.features.length; i++){
            if (this.state.features[i] === feature){
                array.splice(i, 1)
                this.setState({features: array})
                this.props.onSelection(array)
            }
        }
    }

    render() {
        var chips = []
        for (var i=0; i<this.state.features.length; i++){
            chips.push(<Chip variant='outlined' style={chipStyle} key={i} label={this.state.features[i]} color='primary' onDelete={this.deleteFeature.bind(this, this.state.features[i])}></Chip>)
        }
        return(
            <div>
                <PredictorDialog open={this.state.showPredictorDialog} onClose={this.setState({"showPredictorDialog": false})}></PredictorDialog>
                <h3 style={sectionTitle}>Selected features</h3>
                <span>These are a list of predictors for your dataset.</span>
                <button onClick={this.setState({showPredictorDialog:true})}>What's a predictor?</button>
                {chips}
            </div>
        )
    }
}