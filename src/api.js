// src/constants/api.js

const BASE_URL = "http://127.0.0.1:8000/api";

export const API = {
  REGISTER: `${BASE_URL}/auth/register`,
  LOGIN: `${BASE_URL}/auth/login`,
  GET_USERS: `${BASE_URL}/users`,
  CREATE_CHAT: `${BASE_URL}/chats/create`,
  SEND_MESSAGE: `${BASE_URL}/messages/send`,
  SEND_REQUEST: `${BASE_URL}/profile/sent/request`,
 
};
