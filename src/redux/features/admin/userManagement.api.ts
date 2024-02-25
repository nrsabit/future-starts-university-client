import {
  TQueryParam,
  TResponseWithRedux,
  TResponseWithReduxAndBaseQuery,
  TStudent,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) =>
            params.append(item.name, item.value as string)
          );
        }

        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformErrorResponse: (response: TResponseWithRedux<TStudent[]>) => {
        console.log("from inside", response);
        return {
          meta: response.meta,
          data: response.data,
        };
      },
    }),
    getAllFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/faculties",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseWithReduxAndBaseQuery<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    CreateStudent: builder.mutation({
      query: (payload) => ({
        url: "/users/create-student",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useGetAllStudentsQuery,
  useGetAllFacultiesQuery,
} = userManagementApi;
