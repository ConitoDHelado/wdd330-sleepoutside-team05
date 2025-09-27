// helper to convert fetch response to JSON
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  constructor(category) {
    // category = "tents" → points to src/json/tents.json
    this.category = category;
    this.path = `./public/json/${this.category}.json`;
  }

  // fetch all products in this category
  async getData() {
    try {
      const response = await fetch(this.path);
      return await convertToJson(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // find one product by its Id (case-sensitive!)
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
