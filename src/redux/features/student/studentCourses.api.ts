import { TOfferedCourse, TResponseWithRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const studentCoursesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetMyOfferedCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { name: string; value: string }) =>
            params.append(item.name, item.value)
          );
        }

        return {
          url: "/offered-courses/my-offered-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["offeredCourse"],
      transformErrorResponse: (
        response: TResponseWithRedux<TOfferedCourse[]>
      ) => {
        return {
          meta: response.meta,
          data: response.data,
        };
      },
    }),
    GetMyEnrolledCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { name: string; value: string }) =>
            params.append(item.name, item.value)
          );
        }

        return {
          url: "/enrolled-courses/my-enrolled-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["enrolledCourses"],
      transformErrorResponse: (
        response: TResponseWithRedux<TOfferedCourse[]>
      ) => {
        return {
          meta: response.meta,
          data: response.data,
        };
      },
    }),
    EnrollCourse: builder.mutation({
      query: (payload) => ({
        url: "/enrolled-courses/create-enrolled-course",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["offeredCourse"],
    }),
  }),
});

export const {
  useGetMyOfferedCoursesQuery,
  useEnrollCourseMutation,
  useGetMyEnrolledCoursesQuery,
} = studentCoursesApi;
