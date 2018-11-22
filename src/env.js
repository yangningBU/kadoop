import envConfig from 'dotenv'
envConfig.config()

const env = {
  ...process.env
}

export default env