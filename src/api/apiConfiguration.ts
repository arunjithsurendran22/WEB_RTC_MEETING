export const API = "api";
export const API_VERSION = "v1";

export const category = "category";
export const product = "product";
export const banner = "banner";
export const favourite = "favourite";
export const auth = "auth";
export const cart = "cart";
export const address = "address";
export const store = "store";
export const newsletter = "news-letter";
export const timeSlot = "time-slot";
export const order = "order";
export const ticketCategory = "ticket-Category";
export const ticket = "ticket";
export const profile = "user";
export const subscription = "subscription-plan";
export const notification = "notification";
export const promocode = "promocode";
export const testimonial = "testimonial";

// Endpoints
export const ENDPOINTS = {
  CATEGORY: {
    GET_ALL: `/${API}/${API_VERSION}/${category}/customer/get-categories`,
    GET_POPULAR: `/${API}/${API_VERSION}/${category}/customer/get-popular`,
  },
  PRODUCT: {
    GET_ALL: `/${API}/${API_VERSION}/${product}/customer/get-products`,
    GET_BY_ID: (id: string) =>
      `/${API}/${API_VERSION}/${product}/customer/get-product/${id}`,
    GET_FLASH_SALE: `/${API}/${API_VERSION}/${product}/customer/get-flash-sale`,
    GET_RECOMMENDED: `/${API}/${API_VERSION}/${product}/customer/get-recommended`,
    GET_EXPRESS: `/${API}/${API_VERSION}/${product}/customer/get-express-products`,
    GET_DEALS: `/${API}/${API_VERSION}/${product}/customer/get-deals`,
    GET_SIMILAR_PRODUCTS: (id: string) =>
      `/${API}/${API_VERSION}/${product}/customer/get-similar-products/${id}`,
    GET_SUB_PRODUCTS: `/${API}/${API_VERSION}/${product}/customer/get-sub-products`,
    GET_SUBSCRIPTION_PRODUCTS: `/${API}/${API_VERSION}/${product}/customer/get-subscription-products`,
    GET_ALL_SUBSCRIPTION_PRODUCTS: `/${API}/${API_VERSION}/${product}/customer/get-all-subscription-products`,

  },
  BANNER: {
    GET_BANNERS: `/${API}/${API_VERSION}/${banner}/get-banners`,
  },
  FAVOURITE: {
    GET_FAVOURITES: `/${API}/${API_VERSION}/${favourite}/get-favourite-products`,
    ADD_FAVOURITE: `/${API}/${API_VERSION}/${favourite}/change-favourite-status`,
  },
  AUTH: {
    LOGIN: `/${API}/${API_VERSION}/${auth}/user-auth`,
    CHECK_USER_EXISTS: `/${API}/${API_VERSION}/${auth}/check-user-exists`,
    LOG_OUT: `/${API}/${API_VERSION}/${auth}/log-out`,
    REFRESH_TOKENS: `/${API}/${API_VERSION}/${auth}/refresh-tokens`,
  },
  CART: {
    ADD_TO_CART: `/${API}/${API_VERSION}/${cart}/add-to-cart`,
    GET_CART_ITEMS: `/${API}/${API_VERSION}/${cart}/get-cart-items`,
    GET_CART_TOTAL: `/${API}/${API_VERSION}/${cart}/get-cart-total`,
    REMOVE_FROM_CART: `/${API}/${API_VERSION}/${cart}/remove-from-cart  `,
    APPLY_COUPEN: `/${API}/${API_VERSION}/${cart}/apply-coupon  `,
    APPLY_COINS: `/${API}/${API_VERSION}/${cart}/apply-coins `,
    REMOVE_COUPEN: `/${API}/${API_VERSION}/${cart}/remove-coupon `,
    REMOVE_COINS: `/${API}/${API_VERSION}/${cart}/remove-coins`,
  },
  ADDRESS: {
    ADD_ADDRESS: `/${API}/${API_VERSION}/${address}/create-address`,
    GET_ALL_ADDRESSES: `/${API}/${API_VERSION}/${address}/get-address`,
    GET_ADDRESS_BY_ID: (id: string) =>
      `/${API}/${API_VERSION}/${address}/get-address/${id}`,
    UPDATE_ADDRESS: (id: string) =>
      `/${API}/${API_VERSION}/${address}/update-address/${id}`,
    DELETE_ADDRESS: (id: string) =>
      `/${API}/${API_VERSION}/${address}/delete-address/${id}`,
    SET_DEFAULT_PRIMARY: (id: string) =>
      `/${API}/${API_VERSION}/${address}/set-as-primary/${id}`,
    CHECK_AVAILABILITY: (id: string) =>
      `/${API}/${API_VERSION}/${address}/check-address-availability/${id}`,
  },
  STORE: {
    GET_DELIVERY_CHARGE: `/${API}/${API_VERSION}/${store}/find-delivery-charge`,
    GET_NEAR_BY_LOCATION: (lat: number, lng: number) =>
      `/${API}/${API_VERSION}/${store}/get-nearest-store?lat=${lat}&lng=${lng}`,
  },
  NEWSLETTER: {
    SUBSCRIBE: `/${API}/${API_VERSION}/${newsletter}/subscribe`,
  },
  TIME_SLOT: {
    GET_ALL_SLOT: (storeId: string | null, slotType: string | null) =>
      `/${API}/${API_VERSION}/${timeSlot}/public-time-slots?storeId=${storeId}&slotType=${slotType}`,
  },
  ORDERS: {
    CREATE_PAYMENT: `/${API}/${API_VERSION}/${order}/create-order-payment2`,
    VERIFY_PATMENT: (id: string) => `/${API}/${API_VERSION}/${order}/verify-order-payment2?id=${id}`,
    CREATE_COD_PAYMENT: `/${API}/${API_VERSION}/${order}/create-cod-order`,
    GET_MY_ORDERS: `/${API}/${API_VERSION}/${order}/get-orders`,
    ADD_RATING: `/${API}/${API_VERSION}/${order}/rate-order`,
    GET_ORDER_DETAILS: (orderId: string) =>
      `/${API}/${API_VERSION}/${order}/get-orders-details/${orderId}`,
  },
  TICKET: {
    GET_TICKET_CATEGOY: `/${API}/${API_VERSION}/${ticketCategory}/user/get-all-ticket-categories`,
    CREATE_TICKET: (categoryId: string) =>
      `/${API}/${API_VERSION}/${ticket}/create-ticket/${categoryId}`,
    GET_ALL_TICKETS: `/${API}/${API_VERSION}/${ticket}/get-all-tickets`,
    CREATE_CHAT: (id: string) =>
      `/${API}/${API_VERSION}/${ticket}/save-chat/${id}`,
    GET_CHAT: (id: string) => `/${API}/${API_VERSION}/${ticket}/get-chat/${id}`,
    CLOSE_TICKET: (id: string) =>
      `/${API}/${API_VERSION}/${ticket}/close-ticekt/${id}`,
  },
  PROFILE: {
    GET_PROFILE: `/${API}/${API_VERSION}/${profile}/get-profile-details`,
    UPDATE_PROFILE: `/${API}/${API_VERSION}/${profile}/update-profile`,
    GET_REFERRALS: `/${API}/${API_VERSION}/${profile}/get-referral-list`,
  },
  SUBSCRIPTION: {
    GET_ALL_SUBSCRIPTION_PLANS: (storeId: string | null) =>
      `/${API}/${API_VERSION}/${subscription}/get-plans?storeId=${storeId}`,
    CREATE_PAYMENT: `/${API}/${API_VERSION}/${subscription}/create-subscription-payment2`,
    VERIFY_PAYMENT: (id: string) => `/${API}/${API_VERSION}/${subscription}/verify-subscription-payment2?id=${id}`,
    GET_ACTIVE_SUBSCRIPTIONS: (storeId: string | null) =>
      `/${API}/${API_VERSION}/${subscription}/get-active-subscriptions?storeId=${storeId}`,
    GET_PURCHASED_PRODUCTS: (subsccriptionId: string) =>
      `/${API}/${API_VERSION}/${subscription}/get-purchased-products/${subsccriptionId}`,
  },
  NOTIFICATION: {
    GET_ALL_NOTIFICATION: `/${API}/${API_VERSION}/${notification}/get-notifications-user`,
    VIEW_NOTIFICATION: (id: string) =>
      `/${API}/${API_VERSION}/${notification}/notifications-view-status/${id}`,
    CLEAR_NOTIFICATION: `/${API}/${API_VERSION}/${notification}/notifications-clear-all`,
  },
  PROMOCODE: {
    GET_ALL_PROMOCODE: `/${API}/${API_VERSION}/${promocode}/get-all-promocodes`,
    GET_SINGLE_PROMOCODE: (id: string) =>
      `/${API}/${API_VERSION}/${promocode}/get-promocode/${id}`,
  },

  TESTIMONIAL: {
    GET_TESTIMONNIALS: `/${API}/${API_VERSION}/${testimonial}/get-testimonials`,
  },
};
