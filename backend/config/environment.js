import env from "dotenv";
env.config()

export const ENV={
    PORT:process.env.PORT || 5000,
    DB_URL:process.env.MONOGE_LOCAL_URL,
    STRIM_API_KEY:process.env.STRIM_API_KEY,
STRIMG_API_SECRET:process.env.STRIMG_API_SECRET,
TOKEN_KEY:process.env.TOKEN_KEY,
NODE_ENV:process.env.NODE_ENV,
GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
AUTH_SECCESS_REDIRECT:process.env.AUTH_SECCESS_REDIRECT,
}