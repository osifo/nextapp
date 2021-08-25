export const filterData = (dataset, colorName, priceMin, priceMax, categoryTags) => {
  let filteredProducts = [];

  if(!colorName && !priceMin && !priceMax && !categoryTags) return dataset;

  for(let i = 0; i < dataset.length; i++) {
    if(
      // colorName && dataset[i].node.colorFamily[0]?.name.toLowerCase() === colorName.toLowerCase() ||
      priceMin && parseFloat(dataset[i].node.shopifyProductEu.variants.edges[0].node.price) >= parseFloat(priceMin) || 
      priceMax && parseFloat(dataset[i].node.shopifyProductEu.variants.edges[0].node.price) <= parseFloat(priceMax) || 
      categoryTags && dataset[i].node.categoryTags?.includes(categoryTags)
    ) {
      filteredProducts.push(dataset[i]);
    } else {
      continue;
    }
  }
  return filteredProducts;
}

export const paginateData = (dataset, pageNumber, pageCount, pageSize) => {
  // if (pageNumber > pageCount) return new Error("Invalid Page number");
  let startIndex;
  const pageData = [];
  let maxPageSize = pageSize

  if (pageNumber === 1) {
    startIndex = 0
  } else {
    startIndex = pageNumber > pageCount ?  0 : pageSize * (pageNumber - 1);
    maxPageSize = dataset.length - startIndex;
  }

  while (pageData.length < maxPageSize) {
    pageData.push(dataset[startIndex + pageData.length])
  }

  return pageData;
}
