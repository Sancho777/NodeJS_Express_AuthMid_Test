const jwt = require('jsonwebtoken')
const DB = require('../db/DB');

exports.data = async (req, res) => {
  let response = false;
  let message = {};
  const date = Date.now();
  const timerMS = process.env.LIMIT_TIME * 60 * 60 * 1000;
  let isToken = false;
  const token = req.headers.authorization?.split(' ')[1];

  const IP = (req.headers['x-forwarded-for'] || '').split(',').pop() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress

  let limit = 1;
  let id;
  try {
    if (token) {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      id = decode.userId;
      const respose = await DB.getUserById(id);
      if (!respose) return res.status(400).send({ error: 'User not found' })
      isToken = true;

    } else if (IP) {
      id = IP;
      isToken = false
    } else return res.status(400), send({ error: 'error' });

    const result = await DB.getLimit(id, isToken);
    if (!result) await DB.insertLimit({ id, timestamp: date }, isToken)
    else limit = result.limit + 1;

    if ((isToken && limit - 1 < process.env.LIMIT_REQ_TOKEN) || (!isToken && limit - 1 < process.env.LIMIT_REQ_IP)) response = true
    else {
      const timerResult = Math.abs(date - result.timestamp - timerMS)
      if (timerResult > timerMS) {
        await DB.updateDate({ id, timestamp: date }, isToken)
        response = true
        limit = 1
      }
      else {
        response = false
        message = { try_on: `${timerResult} ms` }
      }
    }

    if (response) await DB.updateLimit({ id, limit }, isToken)

    if (response) return res.status(200).send({ result: 'ok' })
    else return res.status(400).send({ message })
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: 'Error Token or IP' })
  }

}