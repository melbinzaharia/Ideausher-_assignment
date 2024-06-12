
module.exports.Success                          = { statusCode: 200, code: 200, message: 'Success' }
module.exports.UnauthorizedAccess               = { statusCode: 401, code: 401, message: 'Unauthorized access' }
module.exports.SessionTimedOut                  = { statusCode: 403, code: 100, message: 'Session has been expired' }
module.exports.InvalidParameters                = { statusCode: 403, code: 403, message: 'Invalid parameters' }
module.exports.NoDataFound                      = { statusCode: 404, code: 404, message: 'No data found' }
module.exports.PreconditionFailed               = { statusCode: 412, code: 412, message: 'Precondition failed' }
module.exports.AlreadyExist                     = { statusCode: 412, code: 111, message: 'Already exist' }
module.exports.InternalServerError              = { statusCode: 500, code: 500, message: 'Internal server error' }
module.exports.IncorrectCredentials             = { statusCode: 403, code: 403, message: "Incorrect Credentials" }