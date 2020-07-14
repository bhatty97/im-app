import React from 'react';
import { Link } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './styles';
import Typography from '@material-ui/core/Typography';

const firebase = require("firebase");

class SignupComponent extends React.Component {

constructor () {
    super();
    this.state = {
        email: null,
        password: null,
        passwordConfirmation: null,
        signupError: ''
    };
}


render(){

    const {classes } = this.props;

    

    return(<div>
        <main className={classes.main}>
            <CssBaseline></CssBaseline>
            <Paper className={classes.paper}>
            <Typography component='h1' variant='h5'>
                Sign Up!
            </Typography>
            <form onSubmit={(e) => this.submitSignup(e)} className={classes.form}>
                
                <FormControl required fullWidth margin='normal'>
                    <InputLabel htmlFor='signup-email-input'>Enter Your Email</InputLabel>
                    <Input autoComplete='email' onChange={(e) => this.userTyping('email', e)} autoFocus id='signup-email-input'></Input>
                </FormControl>
                <FormControl required fullWidth margin='normal'>
                    <InputLabel htmlFor='signup-password-input'>Create A Password</InputLabel>
                    <Input type='password' id='signup-password-input' onChange={(e) => this.userTyping('password', e)}></Input>
                </FormControl>
                <FormControl required fullWidth margin='normal'>
                    <InputLabel htmlFor='signup-password-confirmation-input'>Confirm Your Password</InputLabel>
                    <Input type='password' id='signup-password-confirmation-input' onChange={(e) => this.userTyping('passwordConfirmation', e)}></Input>
                </FormControl>
                <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>Submit</Button>
                </form>
                {
                    this.state.signupError ? 
                    <Typography className = {classes.errorText} components='h5' variant='h6'>
                        {this.state.signupError}
                    </Typography> :  
                    null
                }
                <Typography components='h5' variant='h6' className={classes.hasAccountHeader}>Already Have an Account?</Typography>
                <Link className={classes.logInLink} to='/login'>Log In!</Link>
            
            </Paper>
        </main>
        </div>
    );
}

formisValid = () => this.state.password === this.state.passwordConfirmation;

submitSignup = (e) => {
    e.preventDefault();
    if (!this.formisValid()){
        this.setState({ signupError: 'Passwords do not match!'});
    return;
    }

    firebase
    .auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(authRes => {
        const userObj = {
            email: authRes.user.email
        };
        firebase
        .firestore()
        .collection('users')
        .doc(this.state.email)
        .set(userObj)
        .then(() => {
            this.props.history.push('./dashboard')
        }, dbError => {
            console.log(dbError)
            this.setState({  signupError: 'Failed to add user'});
        })
    }, authError => {
        console.log(authError);
        this.setState ({  signupError: 'Failed to add user'})
    })


    }
userTyping = (type, e) => {
    switch (type){
        case 'email': this.setState({ email: e.target.value });
            break;  
        case 'password': this.setState({ password: e.target.value });
            break;
        case 'passwordConfirmation': this.setState({ passwordConfirmation: e.target.value });
            break;    
        
    }
    }    
}

export default withStyles(styles)(SignupComponent);