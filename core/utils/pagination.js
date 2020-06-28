export const mapPaginationResult = ({
  docs,
  totalDocs,
  hasPrevious,
  hasNext,
  previous,
  next,
}) => ({
  hasNextPage: hasNext,
  hasPreviousPage: hasPrevious,
  startCursor: next,
  endCursor: previous,
  result: docs,
  totalResult: totalDocs,
});
