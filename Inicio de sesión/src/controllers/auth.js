import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import {UserModel} from '../models/users'



  const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  };


  const login = async (req, username, password, done) => {
    console.log(username)
    console.log(password)
    const user = await UserModel.findOne({ username });
    console.log(user)
    if (!user || !user.isValidPassword(password)) {
      return done(null, false, { message: 'Invalid Username/Password' });
    } else {
      console.log('Conexion lograda')
      return done(null, user);
    }

   
  };
  
  
const signup = async (req, username, password, done) => {
    console.log('SIGNUP!!');
    
    try {
      console.log(UserModel)
        const { password, email} = req.body;
    console.log(req.body);

      if ( !username) {
        console.log('Invalid body fields');
        return done(null, false, {message: 'Invalid Body Fields'});
      }
  
      const query = {
         username: email,
      };
  
      console.log(query);
      const user = await UserModel.findOne(query);
  
      if (user) {
        console.log('User already exists');
        console.log(user);
        return done(null, false, {message: 'User already exists'});
      } else {
        const userData = {
          username: email,
          password,
        };
  
        const newUser = await UserModel.create(userData);
  
        return done(null, newUser);
      }
    } catch (error) {
      done(error);
    }
  };

export const loginFunc = new LocalStrategy(strategyOptions, login);
export const signUpFunc = new LocalStrategy(strategyOptions, signup);


passport.serializeUser((user, done) => {
  console.log('Se Ejecuta el serializeUser');
  //Notar que vamos a guardar en req.session.passport el id del usuario. nada mas
  done(null, user._id);
});


 passport.deserializeUser((userId, done) => {
  console.log('Se Ejecuta el desserializeUser');

  UserModel.findById(userId).then((user) => {
    return done(null, user);
  })
});

  
