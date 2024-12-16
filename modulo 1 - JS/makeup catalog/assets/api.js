export async function fetchItems() {
    try {
      const res = await fetch(
        "https://makeup-api.herokuapp.com/api/v1/products.json"
      );
      const data = await res.json();
      const products = orderData(data);
      return products;
    } catch (erro) {
      console.log("Erro ao buscar produtos", erro);
    }
  }
  
  export async function fetchFilterBrand(brand) {
    try {
      const res = await fetch(
        `https://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}`
      );
      const data = await res.json();
      const products = orderData(data);
      return products;
    } catch (erro) {
      console.log(`Erro ao buscar produtos da marca ${brand}`, erro);
    }
  }
  
  export async function fetchFilterType(type) {
    try {
      const res = await fetch(
        `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${type}`
      );
      const data = await res.json();
      const products = orderData(data);
      return products;
    } catch (erro) {
      console.log(`Erro ao buscar produtos do tipo ${type}`, erro);
    }
  }
  
  export async function fetchFilterBrandAndType(brand, type) {
    try {
      const res = await fetch(
        `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}&product_type=${type} `
      );
      const data = await res.json();
      const products = orderData(data);
      return products;
    } catch (erro) {
      console.log(
        `Erro ao buscar produtos do tipo ${type} da marca ${brand}`,
        erro
      );
    }
  }
  
  function orderData(data) {
    const products = data
      .map((product) => ({
        ...product,
        price: (product.price * 5.5).toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        }),
        rating: !product.rating ? Math.floor(Math.random() * 6) : product.rating,
        category: !product.category ? "" : product.category,
      }))
      .sort((a, b) => b.rating - a.rating);
    return products;
  }
  