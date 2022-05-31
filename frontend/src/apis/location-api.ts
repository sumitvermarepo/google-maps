import { useMutation, useQuery, useQueryClient } from "react-query"
import { apiRequest } from "./helper"

const addLocation = (location: { lat: number, lng: number }) => {
  return apiRequest.post(`/location`, location);
}

const updateLocation = (id: string) => {
  return apiRequest.put(`/location/${id}`, {});
}

export const useGetAddresses = (address: string, shouldBeFetchAgain: boolean) => {
  return useQuery(['get-address', shouldBeFetchAgain], async () => {
    return apiRequest.get<any>(`/search?key=${address}`).then((response) => {
      return response.data;
    })
  }, {
    enabled: !!address
  })
}

export const useAddNewLocation = () => {
  const queryClient = useQueryClient();
  return useMutation(addLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries('get-searched-locations');
    }
  });
}

export const useUpdateLocationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(updateLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries('get-searched-locations');
    }
  });
}

export const useGetSearchedLocation = () => {
  return useQuery(['get-searched-locations'], async () => {
    return apiRequest.get<any>('/searched-locations').then((response) => {
      return response.data;
    })
  })
}