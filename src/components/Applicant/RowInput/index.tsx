import styled from 'styled-components';

const Row = styled.fieldset`
  display: flex;
  flex-flow: row nowrap;
  margin: 15px 0;
  border-radius: 5px;
  border-style: dotted;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  flex-grow: 1;

  span {
    min-width: 100px;
    display: inline-block;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  }
`;

const InputText = styled.input`
  flex-grow: 0.6;
  padding: 5px;
  color: #378378;
`;

export default function RowInput(props: RowInputProps) {
  return (
    <Row>
      <Label>
        <span>{props.labelText}</span>
        <InputText
          type='text'
          name={props.inputName}
          onChange={props.onInputChange}
        ></InputText>
      </Label>
    </Row>
  );
}

type RowInputProps = {
  labelText: string;
  inputName: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
