import React, {useState} from 'react';
import styled from 'styled-components';

import RowInput from '../../components/Applicant/RowInput';
import logger from '../../utils/logger';

const Wrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  max-width: 1024px;
  margin: 30px auto;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  border: solid 1px #6d6d6d;
`;

const Title = styled.header`
  text-transform: capitalize;
`;

export default function Applicant() {
  const [submitting, setSubmitting] = useState(false);

  const formFields: ApplicantFormFields[] = [
    {name: 'fullname', text: 'Full name'},
    {name: 'address', text: 'Address'},
    {name: 'email', text: 'Email'},
  ];

  const [formData, setFormData] = useState<ApplicantFormData>(
    formFields.reduce((initialState, field) => {
      initialState[field.name] = '';
      return initialState;
    }, {} as ApplicantFormData),
  );

  logger.info(formData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      // "field name": "input value"
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    logger.info(formData);
    setSubmitting(true);
  };

  return (
    <Wrapper>
      <Title>
        <h1>Registration for applicants</h1>
      </Title>

      <form onSubmit={handleSubmit}>
        {formFields.map(field => (
          <RowInput
            key={`row-${field.name}`}
            labelText={field.text}
            inputName={field.name}
            onInputChange={handleChange}
          />
        ))}

        <button type='submit' disabled={submitting}>
          Create
        </button>
      </form>
    </Wrapper>
  );
}

type ApplicantFormFields = {
  name: string;
  text: string;
};

type ApplicantFormData = {
  // "field name": "input value"
  [key: string]: string;
};
