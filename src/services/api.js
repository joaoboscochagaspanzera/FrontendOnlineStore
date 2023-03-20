export async function getCategories() {
  const data = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const response = await data.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(query/* categoryId, query */) {
  const data = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const response = await data.json();
  return response;
}

export async function getProductById(categoryId) {
  const data = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
  const response = await data.json();
  return response;
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
  // aa
}
