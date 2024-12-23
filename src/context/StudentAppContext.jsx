import { createContext, useState } from "react";

export const initialState = {
  fullName: "",
  gender: "",
  email: "",
  phone: "",
  address: "",
};

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [formData, setFormData] = useState(initialState);
  const [students, setStudents] = useState([]);
  const [studentEId, setStudentEId] = useState(null);

  const handleEdit = (student) => {
    setStudentEId(student.id);
    setFormData(student);
  };

  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };
  const value = {
    formData,
    initialState,
    setFormData,
    students,
    setStudents,
    studentEId,
    setStudentEId,
    handleDelete,
    handleEdit,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
