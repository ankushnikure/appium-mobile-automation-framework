import dotnev from 'dotenv';

const ENV = process.env.ENV || 'qa';

const result = dotnev.config({ path: `.env.${ENV}` });

if (result.error) {
    throw new Error(`Could not load .env.${ENV}: ${result.error.message}`);
}

const { USERNAME, PASSWORD } = process.env;

if (!USERNAME || !PASSWORD) {
    throw new Error(`Required variable missing in .env.${ENV}`);
}

export const env = {
    username: USERNAME,
    password: PASSWORD
}