import React, { useContext } from "react";
import { TextField, Button, Box, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { AppContext } from "../context/StudentAppContext";


export const StudentForm = () => {
  const {
    formData,
    initialState,
    setFormData,
    students,
    setStudents,
    studentEId,
    setStudentEId,
  } = useContext(AppContext);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (studentEId) {
      setStudents(
        students.map((student) =>
          student.id === studentEId ? { ...formData, id: studentEId } : student
        )
      );
      setStudentEId(null);
    } else {
      setStudents([...students, { ...formData, id: Date.now() }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData(initialState);
    setStudentEId(null);
  };

  return (


    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        flex: 1,
        maxWidth: { xs: "100%", md: "30%" },
        backgroundColor: "#f5f5f5",
        border: " solid 1px #fcfcfc",
        borderRadius: "5px",
        padding: 3,
      }}
    >
      <TextField
        label="Full Name"
        variant="outlined"
        value={formData.fullName}
        onChange={(e) => handleChange("fullName", e.target.value)}
        required
      />
      <TextField
        label="Email Address"
        type="email"
        variant="outlined"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        required
      />
       <FormLabel>Gender</FormLabel>
      <RadioGroup
        value={formData.gender}
        onChange={(e) => handleChange("gender", e.target.value)}
        row
      >
        <FormControlLabel value="Male" control={<Radio />} label="Male" />
        <FormControlLabel value="Female" control={<Radio />} label="Female" />
        <FormControlLabel value="Other" control={<Radio />} label="Other" />
      </RadioGroup>
      <TextField
        label="Phone Number"
        type="tel"
        variant="outlined"
        value={formData.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        required
      />
      <TextField
        label="Address"
        multiline
        rows={2}
        variant="outlined"
        value={formData.address}
        onChange={(e) => handleChange("address", e.target.value)}
        required
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Button variant="contained" color="primary" type="submit">
          {studentEId ? "Update" : "Submit"}
        </Button>
        {Object.values(formData).some((value) => value !== "") && (
          <Button
            onClick={resetForm}
            variant="contained"
            color="warning"
            type="button"
          >
            Clear All
          </Button>
        )}
      </Box>
    </Box>

  );
};
