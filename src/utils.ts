export const filterData = (dataset, colorName, priceMin, priceMax, categoryTags) => {
  let filteredProducts = [];
  
  for(let i = 0; i < dataset.length; i++) {
    if(
      colorName && dataset[i].colorFamily.name === colorName ||
      priceMin && dataset[i].shopifyProductEu.edges.node.price >= priceMin || 
      priceMax && dataset[i].shopifyProductEu.edges.node.price <= priceMax || 
      categoryTags && dataset[i].categoryTags.includes(categoryTags)
    ) {
      filteredProducts.push(dataset);
    }
  }

  return filteredProducts;
}

export const paginateData = (dataset, pageNumber, pageCount, pageSize) => {
  // if (pageNumber > pageCount) return new Error("Invalid Page number");
  const startIndex = pageNumber == 1 ? 0 : pageSize * pageNumber;
  const pageData = [];

  while (pageData.length < pageSize) {
    pageData.push(dataset[startIndex + pageData.length])
  }

  return pageData;
}
