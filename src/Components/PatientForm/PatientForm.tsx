import React from "react";
import { Form, useNavigate } from "react-router-dom";
import { TPatient } from "../../Routes/Patient";
import styles from "./PatientForm.module.css";
import AddFieldModal from "../AddFieldModal/AddFieldModal";

type PatientFormProps = {
  patientEditValues?: TPatient;
  submitPatientData: (data: TPatient) => void;
};

export const PatientForm: React.FC<PatientFormProps> = ({
  patientEditValues,
  submitPatientData,
}) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = React.useState(patientEditValues?.firstName);
  const [middleName, setMiddleName] = React.useState(patientEditValues?.middleName);
  const [lastName, setLastName] = React.useState(patientEditValues?.lastName);
  const [address, setAddress] = React.useState(patientEditValues?.address);
  const [status, setStatus] = React.useState(patientEditValues?.status);
  const [dob, setDob] = React.useState(patientEditValues?.dob);
  const [customFields, setCustomFields] = React.useState(patientEditValues?.customFields || {});

  const [modalVisable, setModalVisible] = React.useState(false);

  const handleAddField = (fieldName: string) => {
    if (customFields === undefined) {
      setCustomFields({ [fieldName]: "" });
    } else {
      setCustomFields({ ...customFields, [fieldName]: "" });
    }
  }

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

    let patientData: TPatient = {
      firstName,
      middleName,
      lastName,
      address,
      status,
      dob,
      customFields,
    }
    submitPatientData(patientData);
  };

  return (
    <>
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
        {Object.keys(customFields).map((key) => (
            <div key={key} className={styles.customFieldContainer}>
              <span>{key}</span>
              <input
                type="text"
                name={key}
                required 
                value={customFields[key]}
                onChange={(e) =>
                  setCustomFields({
                    ...customFields,
                    [key]: e.target.value,
                  })
                }
              />
            </div>
          ))}
        <div className={styles.buttonContainer}>
          <button type="submit">Save</button>
          <button type="button" onClick={() => {
            navigate("/dashboard");
          }}>Cancel</button>
          <button type="button" onClick={() => setModalVisible(true)}>Add field</button>
        </div>
      </Form>
      <AddFieldModal
        visible={modalVisable}
        closeModal={() => setModalVisible(false)}
        addField={handleAddField}
      />
    </>
  );
};
