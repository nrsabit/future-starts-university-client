import { Button, Col, Divider, Form, Input, Row } from "antd";
import FsForm from "../../../components/form/FsForm";
import FsInput from "../../../components/form/FsInput";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import FsSelect from "../../../components/form/FsSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/globals";
import FsDatePicker from "../../../components/form/FsDatePicker";
import {
  useGetAcademicDepartmentsQuery,
  useGetAllAcademicSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import {
  TAcademicDepartment,
  TAcademicSemester,
} from "../../../types/AcademicManagement.types";
import { useCreateStudentMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { TResponseWithReduxAndBaseQuery } from "../../../types";

export const studentDummyData = {
  student: {
    name: {
      firstName: "Jahid",
      middleName: "Hasan",
      lastName: "Manik",
    },
    gender: "male",
    dateOfBirth: "1995-05-15",
    bloodGroup: "A-",

    email: "jahid@manik.com",
    contactNo: "123-456-7790",
    emergencyContactNo: "987-654-3210",
    presentAddress: "123 Main Street, Cityville",
    permanentAddress: "456 Oak Avenue, Townsville",

    guardian: {
      fatherName: "Bob Smith",
      fatherOccupation: "Engineer",
      fatherContactNo: "111-222-3333",
      motherName: "Alice Smith",
      motherOccupation: "Doctor",
      motherContactNo: "444-555-6666",
    },

    localGuardian: {
      name: "Lisa Johnson",
      occupation: "Teacher",
      contactNo: "777-888-9999",
      address: "789 Pine Street, Villagetown",
    },
    admissionSemester: "65675df5333479baa417f0af",
    academicDepartment: "6568fc592cbf44a098987e4f",
    isDeleted: false,
  },
};

//! This is only for development
//! Should be removed
const studentDefaultValue = {
  name: {
    firstName: "I am ",
    middleName: "Student",
    lastName: "Number 5",
  },
  gender: "male",
  bloodGroup: "A+",

  email: "jahid@manik.com",
  contactNo: "1235678",
  emergencyContactNo: "987-654-3210",
  presentAddress: "123 Main St, Cityville",
  permanentAddress: "456 Oak St, Townsville",

  guardian: {
    fatherName: "James Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "111-222-3333",
    motherName: "Mary Doe",
    motherOccupation: "Teacher",
    motherContactNo: "444-555-6666",
  },

  localGuardian: {
    name: "Alice Johnson",
    occupation: "Doctor",
    contactNo: "777-888-9999",
    address: "789 Pine St, Villageton",
  },
};

const CreateStudent = () => {
  const [addStudent] = useCreateStudentMutation();

  const { data: semesterData, isLoading: isLoadingSemester } =
    useGetAllAcademicSemestersQuery(undefined);

  const { data: departmentData, isLoading: isLoadingDepartment } =
    useGetAcademicDepartmentsQuery(undefined);

  const semesterOptions = semesterData?.data?.map(
    (item: TAcademicSemester) => ({
      value: item._id,
      label: `${item.name} ${item.year}`,
    })
  );

  const departmentOptions = departmentData?.data?.map(
    (item: TAcademicDepartment) => ({
      value: item._id,
      label: item.name,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Student Creating");
    const studentData = {
      passaword: "student12345",
      student: data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.profileImage);
    try {
      const res = (await addStudent(
        formData
      )) as TResponseWithReduxAndBaseQuery<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res.data.message, { id: toastId });
      }
      console.log(res);
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Row justify="center">
      <Col span={24}>
        <FsForm onSubmit={onSubmit} defaultValues={studentDefaultValue}>
          <Divider>Personal Info.</Divider>
          <Row gutter={10}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FsInput
                type="text"
                name="name.firstName"
                label="First Name"
              ></FsInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FsInput
                type="text"
                name="name.middleName"
                label="Middle Name"
              ></FsInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FsInput
                type="text"
                name="name.lastName"
                label="Last Name"
              ></FsInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FsSelect
                options={genderOptions}
                name="gender"
                label="Gender"
              ></FsSelect>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FsDatePicker
                name="dateOfBirth"
                label="Date Of Birth"
              ></FsDatePicker>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FsSelect
                options={bloodGroupOptions}
                name="bloodGroup"
                label="Blood Group"
              ></FsSelect>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="profileImage"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Profile Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Divider>Contact Info.</Divider>
          <Row gutter={10}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FsInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FsInput type="text" name="contactNo" label="Contact" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FsInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FsInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FsInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>

          <Divider>Guardian</Divider>
          <Row gutter={10}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FsInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FsInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FsInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father ContactNo"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FsInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FsInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FsInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother ContactNo"
              />
            </Col>
          </Row>

          <Divider>Local Guardian</Divider>
          <Row gutter={10}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FsInput type="text" name="localGuardian.name" label="Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FsInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FsInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FsInput
                type="text"
                name="localGuardian.address"
                label="Address"
              />
            </Col>
          </Row>

          <Divider>Academic Info</Divider>
          <Row gutter={10}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FsSelect
                options={semesterOptions}
                disabled={isLoadingSemester}
                name="admissionSemester"
                label="Admission Semester"
              ></FsSelect>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FsSelect
                options={departmentOptions}
                disabled={isLoadingDepartment}
                name="academicDepartment"
                label="Admission Department"
              ></FsSelect>
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </FsForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
