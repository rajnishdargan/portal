'use strict'
const env = process.env
let envVariables = {
  BASE_URL: env.base_url || 'dev.sunbirded.org',
  API_AUTH_TOKEN: env.inquiry_api_auth_token || "",
  USER_API_TOKEN: env.inquiry_user_api_token || "",
  PORTAL_COOKIES: "",
  CHANNEL_ID: env.channel_id || "",
  USER_ID: env.user_id || ""
}
module.exports = envVariables;
