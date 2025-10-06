import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
//   bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
//   default_pass: process.env.DEFAULT_PASS,
  node_env: process.env.NODE_ENV,
//   jwt_secret: process.env.JSON_WEB_TOKEN_SECRET_KEY,
//   jwt_refresh_secret: process.env.JSON_WEB_REFRESH_TOKEN_SECRET,
//   access_token_expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
//   refresh_token_expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
//   reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
//   super_admin_password:process.env.SUPER_ADMIN_PASSWORD
};
