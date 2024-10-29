import React from "react";
import { Form } from "react-router-dom";
import { TPatient } from "../../Routes/Patient";
import styles from "./PatientForm.module.css";

type PatientFormProps = {
  defaultValues?: TPatient;
  submitPatientData: (data: TPatient) => void;
};

export const PatientForm: React.FC<PatientFormProps> = ({
  defaultValues,
  submitPatientData,
}) => {
  const [firstName, setFirstName] = React.useState(defaultValues?.firstName);
  const [middleName, setMiddleName] = React.useState(defaultValues?.middleName);
  const [lastName, setLastName] = React.useState(defaultValues?.lastName);
  const [address, setAddress] = React.useState(defaultValues?.address);
  const [status, setStatus] = React.useState(defaultValues?.status);
  const [dob, setDob] = React.useState(defaultValues?.dob);

  const handleSubmit = () => {
    if (
      firstName === undefined ||
      middleName === undefined ||
      lastName === undefined ||
      address === undefined ||
      status === undefined ||
      dob === undefined
    )
      return;
    submitPatientData({
      firstName,
      middleName,
      lastName,
      address,
      status,
      dob,
    });
  };

  return (
    <Form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.nameContainer}>
        <span>Name</span>
        <div className={styles.nameInputContainer}>
          <input
            placeholder="First"
            aria-label="First name"
            type="text"
            name="first"
            required
            defaultValue={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            placeholder="Middle"
            aria-label="Middle name"
            type="text"
            name="middle"
            required
            defaultValue={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
          <input
            placeholder="Last"
            aria-label="Last name"
            type="text"
            name="last"
            required
            defaultValue={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.statusContainer}>
        <span>Status</span>
        <select
          className={styles.statusPicker}
          name="status"
          required
          defaultValue={status}
          onChange={(e) => setStatus(e.target.value as TPatient["status"])}
        >
          <option value="">Select status...</option>
          <option value="inquiry">Inquiry</option>
          <option value="active">Active</option>
          <option value="onboarding">Onboarding</option>
          <option value="churned">Churned</option>
        </select>
      </div>
      <div className={styles.addressContainer}>
        <span>Address</span>
        <textarea
          required
          className={styles.addressInput}
          placeholder="Full street address"
          name="address"
          defaultValue={address}
          rows={4}
          onChange={(e) => setAddress([e.target.value])}
        />
      </div>
      <div className={styles.dobContainer}>
        <span>Date of birth</span>
        <input
          required
          className={styles.dobInput}
          name="dob"
          defaultValue={dob}
          type="date"
          onChange={(e) => setDob(e.target.value)}
        />
      </div>
      <div className={styles.buttonContainer}>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </div>
    </Form>
  );
};
