import 'dotenv/config'
import { z } from 'zod'
import * as dotenv from 'dotenv'

dotenv.config()

dotenv.config()
const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    SECRET_JWT: z.string(),
    MONGO_DB_NAME: z.string(),
    MONGO_USERNAME: z.string(),
    MONGO_PASSWORD: z.string(),
    MONGO_PORT: z.string(),
    MONGO_URI: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success == false) {
    throw new Error(`Error with env variables : ${_env.error}`)
}

export const env = _env.data