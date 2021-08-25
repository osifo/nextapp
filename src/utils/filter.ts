const filters = {
  colorName: (dataItem, filterParam) => dataItem.node.colorFamily[0]?.name.toLowerCase() === filterParam.toLowerCase(),
  priceMin: (dataItem, filterParam) => parseFloat(dataItem.node.shopifyProductEu.variants.edges[0].node.price) >= parseFloat(filterParam),
  priceMax: (dataItem, filterParam) => parseFloat(dataItem.node.shopifyProductEu.variants.edges[0].node.price) <= parseFloat(filterParam),
  categoryTags: (dataItem, filterParam) => filterParam && dataItem.node.categoryTags?.includes(filterParam)
}

const runFilterOperation = (dataset, filterRule, filterValue) => {
  const results = [];

  for(let i = 0; i < dataset.length; i++) {
    if(filterRule(dataset[i], filterValue)) {
      results.push(dataset[i]);
    } else {
      continue;
    }
  }

  return results;
}

export const filter = (dataset, filterFields) => {
  let filterResults = dataset;
  const filterConditions = Object.keys(filterFields);

  for ( let i = 0; i < filterConditions.length; i++ ) {
    filterResults = runFilterOperation(filterResults, filters[filterConditions[i]], filterFields[filterConditions[i]]);
  }

  return filterResults;
}