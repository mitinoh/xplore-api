export const MONGO_CONNECTION =
  'mongodb://localhost:27017/nest?authSource=admin';

export const auth = {
    isFromDart: false,
    tokenValid: true
}
export const pathDir = {
 ass: './../',
 log: './../log/'
}
export const assetDir = {
  location:"asset/location/",
  badge:"asset/badge/"
}
export const logDir = {
  info: "info/",
  debug: "debug/",
  error: "error/",
}

export const pth = {
  location: pathDir.ass+assetDir.location,
  badge: pathDir.ass+assetDir.badge,
  info: pathDir.log+logDir.info,
  debug: pathDir.log+logDir.debug,
  err: pathDir.log+logDir.error,
}

export const logConf = {
  logDatePattern : 'DD-MM-YYYY',
  logFileMaxSize : '20m'
}
