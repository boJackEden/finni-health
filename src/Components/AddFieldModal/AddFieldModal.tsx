import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { Form } from 'react-router-dom';


interface AddFieldModalProps {
    visible: boolean;
    closeModal: () => void;
    addField: (fieldName: string) => void;
}

const AddFieldModal: React.FC<AddFieldModalProps> = ({ visible, closeModal, addField }) => {
    const [fieldName, setFieldName] = useState('');
    return (
        <ReactModal
            isOpen={visible}
            ariaHideApp={false}
        >
            <Form onSubmit={(event) => { 
                event.preventDefault();
                addField(fieldName);
                closeModal();
            }}>
                <input
                    placeholder="Field Name"
                    aria-label="Field Name"
                    type="text"
                    name="fieldName"
                    required
                    onChange={(e) => setFieldName(e.target.value)}
                />
                
                <button onClick={closeModal}>Cancel</button>
                <button type="submit">Add Field</button>
            </Form>

        </ReactModal>
    );
};

export default AddFieldModal;