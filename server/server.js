const Express = require("express");
const ExpressBasicAuth = require("express-basic-auth");
const ResponseTime = require("response-time");
const Cors = require('cors')
const RateLimit = require('express-rate-limit')
const BodyParserError = require('bodyparser-json-error');
const CookieParser = require('cookie-parser')
const Timeout = require('connect-timeout')
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const Env = require("../globals/env_variables");

const app = Express();

exports.configure = () => {

 
  var corsOptionsDelegate = function (req, callback) {
    // callback(null, corsOptions) // callback expects two parameters: error and options
    var corsOptions;
    console.log(req.headers.host)
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    callback(null, corsOptions) // callback expects two parameters: error and options
  
  //   if (whitelist.indexOf(req.headers.host) !== -1) {
  //     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  //     callback(null, corsOptions) // callback expects two parameters: error and options
  //   } else {
  //     corsOptions = { origin: false } // disable CORS for this request
  //     callback('Cors Error', corsOptions) // callback expects two parameters: error and options
  //   }
  }
  app.use(Cors(corsOptionsDelegate))
   
  const limiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
  
  // Apply the rate limiting middleware to all requests
  // app.use(limiter)
  app.use(ResponseTime());
  app.use(Timeout('5s'))
  
   
  app.use(Express.urlencoded({ extended: true }));
  app.use(Express.json()); // To parse the incoming requests with JSON payloads

  app.use(haltOnTimedout)
  app.use(CookieParser())
  app.use(haltOnTimedout)
  
  // Beautify body parser json syntax error
  app.use(BodyParserError.beautify());

  app.use(
    "/api-docs",
    ExpressBasicAuth({
      users: {
        "admin": "123456",
      },
      challenge: true,
    }),
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );
};

function haltOnTimedout (req, res, next) {
  if (!req.timedout) next()
}

exports.enableRequestLogs = () => {
  app.use(function requestLog(req, _, next) {
    console.log(
      "\nTIME: ",
      Date().toString(),
      "\n\nREQUEST ENDPOINT:",
      req.originalUrl,
      "\n\nREQUEST HEADERS:\n",
      req.headers,
      "\nREQUEST QUERY:\n",
      req.query,
      "\nREQUEST PARAMS:\n",
      req.params,
      "\nREQUEST BODY:\n",
      req.body,
      "\n"
    );
    next();
  });
};

exports.enableErrorLogs = () => {
  app.use(function errorLog(err, _, __, next) {
    console.error("\nTIME: ", Date().toString(), "\n\nERROR:\n", err.stack);
    next(err);
  });
};

exports.enableV1Routes = () => {
  const V1Router = require("../versions/routes/network_routes");
  app.use("/api/v1", V1Router);
};

exports.connect = () => {
  const host = Env.HOST;
  const port = Env.PORT;

  const server = require("http").createServer(app);

  // Server Start
  server.listen(port, host, () => {
    console.log(`Server is listening`);
    console.log(host, port);
  });
};
