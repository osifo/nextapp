export const paginate = (dataset, pageNumber, pageCount, pageSize) => {
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
