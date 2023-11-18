import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import { type IFilterProperties } from '@/interfaces/props/context props/IFilter'
import checkAndSetOrderBy from '@/utility/checkAndSetOrderBy'
import checkAndSetSort from '@/utility/checkAndSetSort'
import urlSearchParamsNumberVerifier from '@/utility/urlSearchParamsNumberVerifier'

/**
 * Generates query parameters based on the provided search parameters.
 * Sanitizes the search parameters and sets default values if needed.
 */
const generateQueryParams = (
  searchParams: SearchParamsPageSize
): IFilterProperties => {
  const sanitizedPage = urlSearchParamsNumberVerifier(searchParams.page ?? '1')

  const queryParams: IFilterProperties = {
    page: sanitizedPage,
    pageSize: '10', // ? We can change this through filters
    sort: checkAndSetSort(searchParams.sort) ?? 'ascending',
    orderBy: checkAndSetOrderBy(searchParams.orderby) ?? 'Name'
  }

  if (searchParams.page !== sanitizedPage) {
    searchParams.page = sanitizedPage
  }

  return queryParams
}

export default generateQueryParams
