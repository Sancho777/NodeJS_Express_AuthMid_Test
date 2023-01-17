

const rateLimiter = {};
const rateLimiterIp = {};

exports.rateLimit = (req, res, next) => {
  const token = req.headers.authorization;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (!rateLimiter[token]) {
    rateLimiter[token] = {
      requests: 0,
      timestamp: Date.now()
    };
  }

  if (!rateLimiterIp[ip]) {
    rateLimiterIp[ip] = {
      requests: 0,
      timestamp: Date.now()
    };
  }

  const timePassed = (Date.now() - rateLimiter[token].timestamp) / 1000;
  const timePassedIp = (Date.now() - rateLimiterIp[ip].timestamp) / 1000;

  if (timePassed > 3600) {
    rateLimiter[token].requests = 1;
    rateLimiter[token].timestamp = Date.now();
  } else {
    rateLimiter[token].requests++;
  }

  if (timePassedIp > 3600) {
    rateLimiterIp[ip].requests = 1;
    rateLimiterIp[ip].timestamp = Date.now();
  } else {
    rateLimiterIp[ip].requests++;
  }

  const tokenLimit = process.env.TOKEN_LIMIT || 200;
  const ipLimit = process.env.IP_LIMIT || 100;

  if (rateLimiter[token].requests > tokenLimit) {
    const resetTime = new Date(rateLimiter[token].timestamp + 3600000);
    return res.status(429).json({
      message: `Rate limit exceeded. You can make the next request at ${resetTime.toUTCString()}`
    });
  }

  if (rateLimiterIp[ip].requests > ipLimit) {
    const resetTime = new Date(rateLimiterIp[ip].timestamp + 3600000);
    return res.status(429).json({
      message: `Rate limit exceeded. You can make the next request at ${resetTime.toUTCString()}`
    });
  }

  next();
}
