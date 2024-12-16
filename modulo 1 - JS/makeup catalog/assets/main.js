import {
    fetchItems,
    fetchFilterBrand,
    fetchFilterType,
    fetchFilterBrandAndType,
  } from "./api.js";
  
  const productsList = document.querySelector(".products");
  const searchInput = document.getElementById("searchProduct");
  const filterOrder = document.getElementById("order");
  const filterBrands = document.getElementById("brands");
  const filterType = document.getElementById("type");
  const notfound = document.querySelector(".notfound");
  const textProducts = document.querySelector(".main__container--text");
  const logo = document.querySelector(".logo");
  searchInput.value = "";
  filterOrder.value = "rating";
  filterBrands.value = "todas";
  filterType.value = "todos";
  let allProducts, filteredProducts;
  
  async function addProducts(product) {
    const details = [
      { detail: "Marca", value: product.brand },
      { detail: "Preço", value: product.price },
      { detail: "Nota", value: product.rating },
      { detail: "Categoria", value: product.category },
      { detail: "Tipo", value: product.product_type },
    ];
  
    const container = document.createElement("div");
    container.classList.add("product");
  
    const containerInfo = document.createElement("div");
    container.id = "container-info";
  
    const containerBasicInfo = document.createElement("div");
    containerBasicInfo.classList.remove("product__basicinfo--hidden");
  
    const image = document.createElement("img");
    image.src = product.image_link;
    image.classList.add("product__image");
  
    image.onerror = () => {
      image.src = "./assets/images/unavailable.png";
    };
  
    const brand = document.createElement("p");
    brand.classList.add("product__brand");
    brand.textContent = product.brand;
  
    const info = document.createElement("div");
    info.classList.add("product__info");
  
    const name = document.createElement("p");
    name.textContent = product.name;
    const price = document.createElement("p");
    price.classList.add("product__info--price");
    price.textContent = product.price;
  
    function addDetail(detail, value) {
      const detailInfo = document.createElement("div");
      detailInfo.classList.add("product__allinfo--info");
  
      const detailType = document.createElement("p");
      detailType.textContent = detail;
  
      const detailValue = document.createElement("p");
      detailValue.textContent = value;
  
      detailInfo.appendChild(detailType);
      detailInfo.appendChild(detailValue);
  
      return detailInfo;
    }
  
    const containerAllInfo = document.createElement("div");
    containerAllInfo.classList.add("product__allinfo");
    containerAllInfo.classList.add("product__allinfo--hidden");
  
    details.forEach((i) => {
      const info = addDetail(i.detail, i.value);
      containerAllInfo.appendChild(info);
    });
  
    info.appendChild(name);
    info.appendChild(price);
  
    container.appendChild(image);
  
    containerInfo.appendChild(containerBasicInfo);
    containerInfo.appendChild(containerAllInfo);
  
    containerBasicInfo.appendChild(brand);
    containerBasicInfo.appendChild(info);
  
    container.appendChild(containerInfo);
  
    productsList.appendChild(container);
  
    container.addEventListener("click", () => {
      const hiddenBasicInfos = productsList.querySelector(
        ".product__basicinfo--hidden"
      );
      const visibleAllInfos = productsList.querySelector(
        ".product__allinfo:not(.product__allinfo--hidden)"
      );
  
      if (hiddenBasicInfos && visibleAllInfos) {
        hiddenBasicInfos.classList.remove("product__basicinfo--hidden");
        visibleAllInfos.classList.add("product__allinfo--hidden");
      }
  
      containerAllInfo.classList.toggle("product__allinfo--hidden");
      containerBasicInfo.classList.toggle("product__basicinfo--hidden");
    });
  }
  
  function renderList(products) {
    filterOrder.disabled = false;
  
    productsList.innerHTML = "";
  
    if (products.length === 0) {
      productsList.appendChild(notfound);
      notfound.classList.remove("hidden");
      filterOrder.disabled = true;
    } else {
      products.forEach((product) => addProducts(product));
    }
  
    filterOrder.addEventListener("change", () => {
      filteredProducts = sortProducts([...products], filterOrder.value);
      renderList(filteredProducts);
    });
  }
  
  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      const search = searchInput.value.trim();
  
      if (!search) return;
  
      const filteredProducts = allProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
  
      textProducts.textContent = `Resultado da pesquisa`;
      renderList(filteredProducts);
    }
  });
  
  logo.onclick = () => {
    searchInput.value = "";
    filterOrder.value = "rating";
    filterBrands.value = "todas";
    filterType.value = "todos";
  
    data();
  };
  
  filterBrands.onchange = () => filters();
  filterType.onchange = () => filters();
  
  function sortProducts(products, filtro) {
    switch (filtro) {
      case "rating":
        return [...products].sort((a, b) => b.rating - a.rating);
      case "lowest":
        return [...products].sort((a, b) => a.price - b.price);
      case "highest":
        return [...products].sort((a, b) => b.price - a.price);
      case "a-to-z":
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case "z-to-a":
        return [...products].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return products;
    }
  }
  
  function filters() {
    const selectedBrand = filterBrands.value;
    const selectedType = filterType.value;
    filterOrder.value = "rating";
    searchInput.value = "";
    textProducts.textContent = `Resultado da pesquisa`;
  
    if (selectedBrand === "todas" && selectedType === "todos") {
      renderList(allProducts);
    } else if (selectedBrand !== "todas" && selectedType === "todos") {
      filterProductsBrand(selectedBrand);
    } else if (selectedBrand === "todas" && selectedType !== "todos") {
      filterProductsType(selectedType);
    } else {
      filterProductsBrandAndType(selectedBrand, selectedType);
    }
  }
  
  async function filterProductsBrandAndType(brand, type) {
    filteredProducts = await fetchFilterBrandAndType(brand, type);
    renderList(filteredProducts);
  }
  
  async function filterProductsBrand(brand) {
    filteredProducts = await fetchFilterBrand(brand);
    renderList(filteredProducts);
  }
  
  async function filterProductsType(type) {
    filteredProducts = await fetchFilterType(type);
    renderList(filteredProducts);
  }
  
  async function data() {
    textProducts.textContent = `Nossos produtos`;
    allProducts = await fetchItems();
    renderList(allProducts);
  }
  
  data();
  