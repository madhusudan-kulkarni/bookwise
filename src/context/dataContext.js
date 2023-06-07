import {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
} from "react";
import { useNavigate } from "react-router";

const DataContext = createContext(null);

export function ContextWrapper({ children }) {
  const [cartData, setCartData] = useState([]);
  const [wishlistData, setWishlistData] = useState([]);
  const [menuToggle, setMenuToggle] = useState(false);
  const [selected, setSelected] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const navigate = useNavigate();

  const reducerFunction = (state, { type, payload }) => {
    switch (type) {
      case "dataInitialization":
        return { ...state, categoryData: payload };

      case "updateData":
        return { ...state, productData: payload };

      case "Login":
        return { ...state, isLoggedIn: !state.isLoggedIn };

      case "userFound":
        return { ...state, foundUser: payload };

      case "Logout":
        return { ...state, isLoggedIn: !state.isLoggedIn };

      case "search":
        navigate("/store");
        return { ...state, searchFilter: payload };

      case "SortData":
        if (payload === "LowToHigh") {
          return { ...state, sortBy: payload };
        } else {
          return { ...state, sortBy: payload };
        }

      case "FilterByRating":
        return { ...state, rating: payload };

      case "setRange":
        return { ...state, range: payload };

      case "setCategory":
        return { ...state, category: [...state.category, payload] };

      case "setCategoryHome":
        return { ...state, category: [payload] };

      case "removeCategory":
        return {
          ...state,
          category: state.category.filter(
            (categoryName) => categoryName !== payload
          ),
        };

      case "resetFilters":
        return { ...state, sortBy: payload, range: 0, category: [], rating: 0 };

      default:
        return { ...state };
    }
  };

  const [state, dispatch] = useReducer(reducerFunction, {
    foundUser: {},
    isLoggedIn: false,
    categoryData: [],
    productData: [],
    searchFilter: "",
    sortBy: "",
    range: 0,
    category: [],
    rating: 0,
  });

  const getCategoryData = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      dispatch({ type: "dataInitialization", payload: data.categories });
    } catch (err) {
      console.log(err);
    }
  };

  const getProductsData = async () => {
    try {
      const products = await fetch("/api/products");
      const productsData = await products.json();
      dispatch({ type: "updateData", payload: productsData.products });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategoryData();
    getProductsData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        state,
        dispatch,
        cartData,
        setCartData,
        wishlistData,
        setWishlistData,
        menuToggle,
        setMenuToggle,
        selected,
        setSelected,
        addresses,
        setAddresses,
        deliveryAddress,
        setDeliveryAddress,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useDataContext = () => useContext(DataContext);
