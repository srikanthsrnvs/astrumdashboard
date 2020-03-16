import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom'
import AstrumIcon from './Icons/astrumIcon'


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
      marginBottom: '20px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.white,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
    const classes = useStyles();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()
    
    function signIn(e){
        e.preventDefault()
        console.log(email, password, props.firebase)
        props.firebase
        .signIn(email, password)
        .then(authUser => {
            console.log(authUser)
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        props.firebase.auth
        .onAuthStateChanged((user, err) => {
            if(user){
                props.onSignIn(user)
                history.push('/dashboard')
            }else{
                console.log(user, err)
                props.onSignIn("")
                history.replace('/')
            }
        })
    }, [])

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <AstrumIcon className={classes.icon}/>
            <Typography component="h1" variant="h5">
            Sign into Astrum
            </Typography>
            <form onSubmit={signIn} className={classes.form} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={e => setEmail(e.target.value)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign In
            </Button>
            <Grid container>
                <Grid item xs>
                <Link href="#" variant="body2">
                    Forgot password?
                </Link>
                </Grid>
                <Grid item>
                <Link href="http://www.astrum.ai/#signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
        </Container>
    );
}