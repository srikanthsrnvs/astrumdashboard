import React, { useState } from 'react';
import {Redirect, useHistory, useRouteMatch} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        minWidth: 345
    },
    media: {
        height: 200,
        width: '100%',
        // marginLeft: '25%',
        // marginTop: 10
    }
});

export default function TaskTypeCard(props) {
    const classes = useStyles();
    const tags = props.tags
    const linkTo = props.linkTo
    const history = useHistory()
    const match = useRouteMatch()

    const FeatureTags = () => {
        let feature_tags = []
        if (!tags){
            return null
        }
        tags.forEach(tag => {
            feature_tags.push(<Chip key={tag} style={{marginRight:10}} label={tag}/>)
        });
        return (
            <div >
                {feature_tags}
            </div>
        )
    }

    function openSection(){
        history.push(`${match.url}${linkTo}`)
    }

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={openSection}>
                <CardMedia
                    image={props.image}
                    className={classes.media}
                    title={props.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{paddingBottom:20}}>
                        {props.text}
                    </Typography>
                    <FeatureTags />
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
