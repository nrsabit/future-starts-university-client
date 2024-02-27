import { TResponseWithRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const facultyCoursesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetAllFacultyCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { name: string; value: string }) =>
            params.append(item.name, item.value)
          );
        }

        return {
          url: "/enrolled-courses",
          method: "GET",
          params: params,
        };
      },
      transformErrorResponse: (response: TResponseWithRedux<any>) => {
        return {
          meta: response.meta,
          data: response.data,
        };
      },
    }),
    UpdateCourseMarks: builder.mutation({
      query: (payload) => ({
        url: "/enrolled-courses/update-enrolled-course-marks",
        method: "PATCH",
        body: payload,
      }),
    }),
  }),
});

export const { useGetAllFacultyCoursesQuery, useUpdateCourseMarksMutation } =
  facultyCoursesApi;
