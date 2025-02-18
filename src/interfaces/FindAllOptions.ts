interface FindAllOptions {
  selectionObject?: string | string[] | Record<string, number | boolean | object>;
  sortObject?: object;
  pageNumber?: number;
  limitNumber?: number;
}

export default FindAllOptions;
