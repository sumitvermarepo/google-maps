import { useQuery } from 'react-query'
import { mapRequest } from './helper'

export const useGetAddresses = (address: string, shouldBeFetchAgain: boolean) => {
  const URL = `maps/api/place/autocomplete/json?input=${address}&types=establishment&location=37.76999%2C-122.44696&radius=500&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
  return useQuery(['get-address', shouldBeFetchAgain], async () => {
    return mapRequest.get<any>(URL).then((response) => {
      return response.data;
    })
  }, {
    enabled: !!address
  })
}