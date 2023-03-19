import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubStrategy } from 'passport-github-2';
import UsersManager from './usersManager.js';
import { usersModel } from '../dao/mongoDB/models/users.model.js';

const usersManager = new UsersManager();

//passport local strategy
passport.use(
    "registro",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const usuario = new usersModel({ email, password });
        if (usuario.lenght > 0) {
          return done(null, false);
        } else {
          const hashNewPassword = await hashPassword(password);
          const newUser = { ...req.body, password: hashNewPassword };
          const newUserBD = await usersModel.create(newUser);
          return done(null, newUserBD);
        }
      }
    )
  );

//passport github strategy
//passport-jwt
passport.use('jwt', new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secretJWT'
  },
    async (jwtPayload, done) => {
      //console.log(jwtPayload);
      done(null, jwtPayload.user);
    }
  ))
