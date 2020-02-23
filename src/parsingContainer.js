import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
import BuildIcon from '@material-ui/icons/Build'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'


function Alert(props){
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = (theme) => ({
    sectionHeader: {
        marginTop: '40px'
    },
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    }
});


class ParsingContainer extends Component{

    constructor(props){
        super(props)
        this.state = {
            target: props.target,
            features: props.features,
            error: "",
            open: false
        }
        this.buildNetwork = this.buildNetwork.bind(this)
        this.validateFeatures = this.validateFeatures.bind(this)
        this.validateTarget = this.validateTarget.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleClose(){
        this.setState({open:false, error: ""})
    }

    validateTarget(){
        if(this.state.target != ''){
            return {success: true, error: ''}
        }else{
            return {success: false, error: 'There must be a target selected.'}
        }
    }

    validateFeatures(){
        if(this.state.features.length >= 1){
            if(this.state.features.includes(this.state.target)){
                return {success: false, error: "Prediction targets cannot be a feature."}
            }else{
                return {success: true, error: ""}
            }
        }else{
            return {success: false, error: "There must be at least one feature to predict the target from."}
        }
    }

    buildNetwork(){
        var featuresValidated = this.validateFeatures()
        var targetValidated = this.validateTarget()

        if(!featuresValidated.success){
            this.setState({open: true, error: featuresValidated.error})
        }else if (!targetValidated.success){
            this.setState({error: targetValidated.error, open: true})
        }else{
            this.setState({open: false, error: ""})
            var xhr = new XMLHttpRequest()
            xhr.open('POST', 'http://127.0.0.1:8080/datasets/params')
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify({
                "features": this.state.features,
                "target": this.state.target 
            }))
            xhr.addEventListener('load', () => {
                if (xhr.status == 200){
                    var headers = JSON.parse(xhr.response).headers
                    //TODO
                }
            })
        }
    }

    render(){
        const {classes} = this.props;
        return(
            <div className={classes.root}>
                <h3 className={classes.sectionHeader}>Train</h3>
                <br></br>
                <Button startIcon={<BuildIcon/>} variant='contained' color='primary' disableElevation onClick={this.buildNetwork}>Build neural network</Button>
                <Snackbar anchorOrigin={{vertical: 'bottom', horizontal:'right'}} autoHideDuration={6000} open={this.state.open} onClose={this.handleClose}>
                    <Alert severity='error'>{this.state.error}</Alert>
                </Snackbar>
            </div>
        )
    }
}

export default withStyles(styles)(ParsingContainer)