require('dotenv').config();

module.exports = {
  config: {
    app_name: process.env.APP_NAME || "POS-NIT",
    app_version: process.env.APP_VERSION || "1.0",
    image_path: process.env.IMAGE_PATH || "C:/xampp/htdocs/fullstack/",
    db: {
      HOST: process.env.DB_HOST || "localhost",
      USER: process.env.DB_USER || "root",
      PASSWORD: process.env.DB_PASSWORD || "",
      DATABASE: process.env.DB_DATABASE || "gas_station_db",
      PORT: process.env.DB_PORT || 3306,
    },
    token: {
      access_token_key: process.env.ACCESS_TOKEN_KEY || "#$*%*(*234898ireiuLJEROI#@)(#)$*@#)*$(@948858839798283838jaflke",
    },
  },
};
