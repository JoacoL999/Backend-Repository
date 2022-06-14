import { Router } from 'express'

import path from 'path'
import passport from 'passport'
import { isLoggedIn } from '../middlewares/auth';

const authWebRouter = new Router()
const passportOptions = { badRequestMessage: 'Falta username / password' };


authWebRouter.get('/', (req, res) => {
    res.redirect('/home')
})

authWebRouter.get('/login', (req, res) => {

        res.sendFile(path.join(process.cwd(), '/views/login.html'))
        console.log(req.isAuthenticated())
        
    
})

authWebRouter.get('/logout', (req, res, next) => {
    
res.render(path.join(process.cwd(), '/views/pages/logout.ejs'))
req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
});
       
})

authWebRouter.post('/login',

    passport.authenticate('login', passportOptions),
    function (req, res) {

        res.redirect('/home')
    },
  );




export default authWebRouter