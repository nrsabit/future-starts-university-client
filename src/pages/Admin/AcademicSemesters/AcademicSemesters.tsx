import { useGetAllAcademicSemestersQuery } from "../../../redux/features/academicSemesters/academicSemesterApi";

const AcademicSemesters = () => {
  const { data } = useGetAllAcademicSemestersQuery(undefined);
  console.log(data);
  return (
    <div>
      <h1>This is the Academic Semesters Component</h1>
    </div>
  );
};

export default AcademicSemesters;
