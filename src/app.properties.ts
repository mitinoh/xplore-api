export const MONGO_CONNECTION = 'mongodb://localhost:27017/nest?authSource=admin'

export const auth = {
  isFromDart: false,
  tokenValid: true
}
export const pathDir = {
  ass: './../../',
  log: './../../log/'
}
export const assetDir = {
  location: "asset/location/",
  newLocation: "asset/newLocation/",
  badge: "asset/badge/",
  user: "asset/user/",
  all: "asset/all/"
}
export const logDir = {
  info: "info/",
  debug: "debug/",
  error: "error/",
}

export const pth = {
  location: pathDir.ass + assetDir.location,
  newLocation: pathDir.ass + assetDir.newLocation,
  badge: pathDir.ass + assetDir.badge,
  user: pathDir.ass + assetDir.user,
  all: pathDir.ass + assetDir.all,
  info: pathDir.log + logDir.info,
  debug: pathDir.log + logDir.debug,
  err: pathDir.log + logDir.error,
}

export const logConf = {
  logDatePattern: 'DD-MM-YYYY',
  logFileMaxSize: '20m'
}
