import {
  TResponseWithRedux,
  TResponseWithReduxAndBaseQuery,
} from "../../../types";
import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "../../../types/AcademicManagement.types";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetAllAcademicSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { name: string; value: string }) =>
            params.append(item.name, item.value)
          );
        }

        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      transformErrorResponse: (
        response: TResponseWithRedux<TAcademicSemester[]>
      ) => {
        console.log("from inside", response);
        return {
          meta: response.meta,
          data: response.data,
        };
      },
    }),
    CreateAcademicSemester: builder.mutation({
      query: (payload) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: payload,
      }),
    }),
    getAcademicFaculties: builder.query({
      query: () => {
        return { url: "/academic-faculties", method: "GET" };
      },
      transformResponse: (
        response: TResponseWithReduxAndBaseQuery<TAcademicFaculty[]>
      ) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
    }),
    getAcademicDepartments: builder.query({
      query: () => {
        return { url: "/academic-departments", method: "GET" };
      },
      transformResponse: (
        response: TResponseWithReduxAndBaseQuery<TAcademicDepartment[]>
      ) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllAcademicSemestersQuery,
  useCreateAcademicSemesterMutation,
  useGetAcademicFacultiesQuery,
  useAddAcademicFacultyMutation,
  useGetAcademicDepartmentsQuery,
  useAddAcademicDepartmentMutation,
} = academicManagementApi;
