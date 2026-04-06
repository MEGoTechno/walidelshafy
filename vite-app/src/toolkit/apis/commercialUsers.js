import { apiSlice } from "../apiSlice";

const usersApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCommercial: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/commercial",
                    params
                }
            },
        }),
        deleteManyCommercial: builder.mutation({
            query: data => ({
                url: '/commercial',
                method: 'DELETE',
                body: data,
                params: data
            })
        }),
        analysisCommercial: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/commercial/analysis",
                    params
                }
            },
        }),
        analysisCommercialsByKeys: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/commercial/analysisKeys",
                    params
                }
            },
        }),
        getOneCommercial: builder.query({
            query: (userName) => `/commercial/${userName}`
        }),
        createCommercial: builder.mutation({
            query: data => ({
                url: '/commercial',
                method: 'POST',
                body: data
            })
        }),
        addToCommercial: builder.mutation({
            query: (data) => {
                return {
                    url: `/commercial/push`,
                    method: 'PATCH',
                    body: data
                }
            }
        }),
        updateCommercial: builder.mutation({
            query: (data) => {
                return {
                    url: `/commercial/` + data._id,
                    method: 'PUT',
                    body: data
                }
            }
        }),
        updateCommercialProfile: builder.mutation({
            query: (data) => ({
                url: `/commercial/` + data.get("id"),
                method: 'PATCH',
                body: data
            })
        }),
        deleteCommercial: builder.mutation({
            query: (data) => ({
                url: `/commercial/` + data._id,
                method: 'DELETE',
                // body: data
            })
        }),
    }),
    overrideExisting: false,
})

export const {
    useLazyGetCommercialQuery,
    useUpdateCommercialMutation,
    useDeleteCommercialMutation,
    useDeleteManyCommercialMutation

} = usersApi