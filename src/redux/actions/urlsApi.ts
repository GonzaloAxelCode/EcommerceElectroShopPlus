export const URL_BASE = process.env.REACT_APP_API_URL;
//auth urls
export const AUTH_USERS_URL = "auth/users/";
export const ACTIVATE_USER_URL = "auth/users/activation/";
export const USER_LOGIN_URL = "auth/jwt/create/";
export const GET_USER_URL = "auth/users/me/";
export const AUTH_VERIFY_URL = "auth/jwt/verify/";
export const REFRESH_TOKEN_URL = "auth/jwt/refresh/";
export const RESET_PASSWORD_SEND_URL = "auth/users/reset_password/";
export const RESET_PASSWORD_CONFIRM_URL = "auth/users/reset_password_confirm/";
// products && categories urls
export const GET_PRODUCTS_URL = "api/product/get_products";
export const SEARCH_PRODUCTS_URL = "api/product/search";
export const PRODUCT_DETAIL_URL = "api/product/product";
export const RELATED_PRODUCTS_URL = "api/product/related";
export const FILTER_PRODUCTS_URL = "api/product/by/search";
