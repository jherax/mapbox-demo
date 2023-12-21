import {styled} from 'styled-components';

const $marginLeft = '5px';

export const MainWrapper = styled.section<{$maxWidth: string}>`
  color: #444;
  fieldset {
    max-width: ${props => props.$maxWidth};
    position: relative;

    select,
    input {
      margin-left: ${$marginLeft};
      color: #444;
      border: none;
      &:focus,
      &:active {
        outline: none;
      }
    }

    section {
      margin: 8px;
      padding: 8px;
      &:not(.countries_container) {
        border: solid 1px #444;
      }
    }

    section.countries_container {
      label {
        margin-right: 5px;
        font-size: 0.9em;
      }
      select.countries_dropdown {
        cursor: pointer;
      }
    }

    section.autocomplete_container {
      display: flex;
      flex-flow: row wrap;
      border-style: dashed;

      input.autocomplete_input {
        flex-grow: 1;
      }
      label.autocomplete_tags_item {
        margin: ${$marginLeft};
        padding: 4px 7px;
        box-sizing: border-box;
        border: solid 1px #5e8da0;
        background-color: rgba(142, 175, 189, 0.1);
        font-size: 0.8em;
        &:hover {
          border: solid 1px #a05e6c;
          background-color: rgba(160, 94, 108, 0.1);
        }
      }
    }

    section.autocomplete_results {
      /* position: absolute; */
      z-index: 1;
      margin-top: 3px;
      background: white;
      color: #666;
      font-size: 0.9em;

      div.autocomplete_results_item {
        cursor: pointer;
        padding: 4px;
        &:hover {
          background-color: rgba(207, 200, 174, 0.4);
        }
      }
    }
  }
`;

// ---------------------------------

export const TagsContainer = styled.section``;
const TagElement = styled.label``;
export type TagsItemProps = Readonly<{
  value: string;
  className: string;
  onClick: (tag: string) => void;
}>;

export function TagsItem(props: TagsItemProps) {
  const handleClick = () => props.onClick(props.value);
  return (
    <TagElement className={props.className} onClick={handleClick}>
      {props.value}
    </TagElement>
  );
}

// ---------------------------------

export const ResultsContainer = styled.section<{$show: number}>`
  display: ${({$show}) => ($show ? 'block' : 'none')};
`;

const Suggestion = styled.div``;
export type ResultsItemProps = Readonly<{
  value: string;
  className: string;
  onClick: (value: string) => void;
}>;

export function ResultsItem(props: ResultsItemProps) {
  const handleClick = () => props.onClick(props.value);
  return (
    <Suggestion
      className={props.className}
      onClick={handleClick}
      role='listitem'
    >
      {props.value}
    </Suggestion>
  );
}
