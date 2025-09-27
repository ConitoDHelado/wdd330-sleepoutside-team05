import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

//  FIX: get product id from query string
const productId = getParam("product");

//  FIX: make sure dataSource points to "tents" (or category folder)
const dataSource = new ProductData("tents");

//  FIX: initialize ProductDetails with correct params
const product = new ProductDetails(productId, dataSource);
product.init();
