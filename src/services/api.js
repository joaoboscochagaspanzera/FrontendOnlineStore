export async function getCategories() {
  const data = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const response = await data.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(/* categoryId, query */) {
  const data = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=$QUERY');
  const response = await data.json();
  return response;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
