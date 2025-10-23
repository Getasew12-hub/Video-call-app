import env from "dotenv";
env.config()

export const ENV={
    PORT:process.env.PORT || 5000,
    DB_URL:process.env.MONOGE_LOCAL_URL,
    STRIM_API_KEY:process.env.STRIM_API_KEY,
STRIMG_API_SECRET:process.env.STRIMG_API_SECRET
}