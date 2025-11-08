import { getLocalStorage, setLocalStorage, qs } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.productData = null;
  }

  async init() {
    this.productData = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    this.setupAddToCartButton();
  }

  setupAddToCartButton() {
    const addToCartButton = qs('#addToCart');
    if (addToCartButton) {
      addToCartButton.addEventListener('click', () => this.addProductToCart());
    }
  }

  addProductToCart() {
    //  FIX: use "so-cart" consistently
    const cart = getLocalStorage('so-cart') || [];
    cart.push(this.productData);
    setLocalStorage('so-cart', cart);
    alert(`${this.productData.Name} has been added to your cart!`);
  }

  renderProductDetails() {
    const productContainer = qs('.product-detail');
    if (productContainer) {
      productContainer.innerHTML = `
        <h3>${this.productData.Brand.Name}</h3>
        <h2 class="divider">${this.productData.Name}</h2>
        <img class="divider" src="${this.productData.Image}" alt="${this.productData.Name}" />
        <p class="product-card__price">$${this.productData.FinalPrice}</p>
        <p class="product__color">${this.productData.Colors[0].ColorName}</p>
        <p class="product__description">${this.productData.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.productData.Id}">Add to Cart</button>
        </div>
      `;
    }
  }
}
