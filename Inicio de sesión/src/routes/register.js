import { Router } from 'express'

import path from 'path'
import passport from 'passport'


const registerWebRouter = new Router()
const passportOptions = { badRequestMessage: 'Falta username / password' };

registerWebRouter.get('/signup', (req, res) => {
        res.sendFile(path.join(process.cwd(), '/views/register.html'))
})


registerWebRouter.post('/signup', (req, res, next) => {
  passport.authenticate('signup', passportOptions, (err, user, info) => {
    console.log('Info SIGNUP');
    console.log(err, user, info);
    if (err) {
      return next(err);
    }
    if (!user) return res.status(401).json({ data: info });

    res.json({ msg: 'signup OK' });
  })(req, res, next);
});


export default registerWebRouter




