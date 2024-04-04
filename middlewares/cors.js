import cors from 'cors'

const whitelist = ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:80']

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true)
    }
    if (!origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

export const corsMiddleware = () => cors(corsOptions)
