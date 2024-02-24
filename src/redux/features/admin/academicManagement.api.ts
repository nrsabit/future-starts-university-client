import { TResponseWithRedux } from "../../../types";
import { TAcademicSemester } from "../../../types/AcademicManagement.types";
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
  }),
});

export const {
  useGetAllAcademicSemestersQuery,
  useCreateAcademicSemesterMutation,
} = academicManagementApi;
