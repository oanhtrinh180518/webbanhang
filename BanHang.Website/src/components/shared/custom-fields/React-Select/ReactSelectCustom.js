import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';


function ReactSelectCustom(props) {
  // console.log(options);
  const { field, form, options } = props;
  console.log(options)
  const { name, value } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const selectedOption = options.find(option => option.value === value);
  const handleSelectedOptionChange = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : selectedOption;

    const changeEvent = {
      target: {
        name: name,
        value: selectedValue
      }
    };
    field.onChange(changeEvent);
  }

  return (
    <>
      <Select
        {...field}
        value={selectedOption}
        onChange={handleSelectedOptionChange}

        className="basic-single"
        classNamePrefix="select"
        // defaultValue={options[0]}
        // isDisabled={isDisabled}
        isClearable={true}
        isSearchable={true}
        name="color"
        options={options}

      />
    </>
  );
}

ReactSelectCustom.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.array,
};

ReactSelectCustom.defaultProps = {
  label: '',
  placeholder: '',
  disabled: false,
  options: [],
}

export default ReactSelectCustom;

