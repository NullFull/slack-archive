const response = (res, data) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(data))
}

const reject = res => {
  res.status(401)
  res.end()
}

export {
  response,
  reject
}
