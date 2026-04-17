import React, { createContext, useContext, useReducer, useEffect } from "react";

const AppContext = createContext();

const loadFromStorage = (key, fallback) => {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
};

const initialState = {
  user: loadFromStorage("fashionUser", null),
  cart: loadFromStorage("fashionCart", []),
  wishlist: loadFromStorage("fashionWishlist", []),
  orders: loadFromStorage("fashionOrders", []),
  toast: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null, cart: [], wishlist: [] };
    case "ADD_TO_CART": {
      const existing = state.cart.find((i) => i.id === action.payload.id && i.size === action.payload.size);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((i) =>
            i.id === action.payload.id && i.size === action.payload.size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
    }
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((i) => !(i.id === action.payload.id && i.size === action.payload.size)) };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.id === action.payload.id && i.size === action.payload.size
            ? { ...i, quantity: Math.max(1, action.payload.quantity) }
            : i
        ),
      };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "ADD_TO_WISHLIST": {
      const exists = state.wishlist.find((i) => i.id === action.payload.id);
      if (exists) return state;
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    }
    case "REMOVE_FROM_WISHLIST":
      return { ...state, wishlist: state.wishlist.filter((i) => i.id !== action.payload) };
    case "ADD_ORDER":
      return { ...state, orders: [action.payload, ...state.orders] };
    case "SHOW_TOAST":
      return { ...state, toast: action.payload };
    case "HIDE_TOAST":
      return { ...state, toast: null };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("fashionUser", JSON.stringify(state.user));
  }, [state.user]);
  useEffect(() => {
    localStorage.setItem("fashionCart", JSON.stringify(state.cart));
  }, [state.cart]);
  useEffect(() => {
    localStorage.setItem("fashionWishlist", JSON.stringify(state.wishlist));
  }, [state.wishlist]);
  useEffect(() => {
    localStorage.setItem("fashionOrders", JSON.stringify(state.orders));
  }, [state.orders]);

  const showToast = (msg, type = "success") => {
    dispatch({ type: "SHOW_TOAST", payload: { msg, type } });
    setTimeout(() => dispatch({ type: "HIDE_TOAST" }), 3000);
  };

  return (
    <AppContext.Provider value={{ state, dispatch, showToast }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);