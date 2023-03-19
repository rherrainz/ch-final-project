import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { ExtractJwt, Strategy as jwtStrategy} from 'passport-jwt';
import UsersManager from '../dao/mongoDB/controller/usersControler.js';
import { usersModel } from '../dao/mongoDB/models/users.model.js';
import { hashPassword } from "../utils.js";
import 'dotenv/config'


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
passport.use(
    "githubRegistro",
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/users/github/",
      },
      async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      console.log(profile._json.email)
        const usuario = await usersModel.findOneAndDelete({
          email: profile._json.email,
        });
        if (!usuario) {
          const nuevoUsuario = {
            first_name: profile._json.name.split(" ")[0],
            last_name: profile._json.name.split(" ")[1],
            email: profile._json.email,
            password: " ",
          };
          const dbResultado = await usersModel.create(nuevoUsuario);
          done(null, dbResultado);
        } else {
          done(null, usuario);
        }
  
        done(null, usuario);
      }
    )
  );

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
  passport.serializeUser((usuario, done) => {
    done(null, usuario._id);
  });
  
  passport.deserializeUser(async (_id, done) => {
    const usuario = await usersModel.findById(_id);
    done(null, usuario);
  });
  ///
  const cookieExtractor = (req) => {
    const token = req?.cookies?.token;
    return token;
  };

//passport jwt con cookies
passport.use('jwtCookies', new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: 'secretJWT'
  },
    async (jwtPayload, done) => {
      //console.log(jwtPayload);
      done(null, jwtPayload.user);
    }
  ))
   
  
  passport.serializeUser((usuario, done) => {
    done(null, usuario._id);
  });
  
  passport.deserializeUser(async (_id, done) => {
    const usuario = await usersModel.findById(_id);
    done(null, usuario);
  });