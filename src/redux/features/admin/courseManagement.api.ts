import {
  TCourse,
  TResponseWithRedux,
  TResponseWithReduxAndBaseQuery,
  TSemesterRegistration,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetAllSemesterRegistrations: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { name: string; value: string }) =>
            params.append(item.name, item.value)
          );
        }

        return {
          url: "/semester-registrations",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["semester"],
      transformErrorResponse: (
        response: TResponseWithRedux<TSemesterRegistration[]>
      ) => {
        return {
          meta: response.meta,
          data: response.data,
        };
      },
    }),
    CreateSemesterRegistration: builder.mutation({
      query: (payload) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["semester"],
    }),
    UpdateSemesterRegistration: builder.mutation({
      query: (args) => ({
        url: `/semester-registrations/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["semester"],
    }),
    GetAllCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { name: string; value: string }) =>
            params.append(item.name, item.value)
          );
        }

        return {
          url: "/courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["courses"],
      transformErrorResponse: (response: TResponseWithRedux<TCourse[]>) => {
        return {
          meta: response.meta,
          data: response.data,
        };
      },
    }),
    CreateCourse: builder.mutation({
      query: (payload) => ({
        url: "/courses/create-course",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["courses"],
    }),
    AsignFaculties: builder.mutation({
      query: (args) => ({
        url: `/courses/${args.courseId}/assign-faculties`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["courses"],
    }),
    GetCourseFaculties: builder.query({
      query: (id) => {
        return {
          url: `/courses/${id}/get-faculties`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseWithReduxAndBaseQuery<any>) => {
        return {
          data: response.data,
        };
      },
    }),
    CreateOfferedCourse: builder.mutation({
      query: (data) => ({
        url: `offered-courses/create-offered-course`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["courses"],
    }),
  }),
});

export const {
  useCreateSemesterRegistrationMutation,
  useGetAllSemesterRegistrationsQuery,
  useUpdateSemesterRegistrationMutation,
  useGetAllCoursesQuery,
  useCreateCourseMutation,
  useAsignFacultiesMutation,
  useGetCourseFacultiesQuery,
  useCreateOfferedCourseMutation,
} = courseManagementApi;
