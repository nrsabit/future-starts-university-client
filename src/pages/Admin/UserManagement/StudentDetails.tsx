import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { studentId } = useParams();
  return (
    <div>
      <h1>This is the Student Details for {studentId}</h1>
    </div>
  );
};

export default StudentDetails;
