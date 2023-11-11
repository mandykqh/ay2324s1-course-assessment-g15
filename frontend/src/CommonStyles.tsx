export const PRIMARY_COLOR = '#282c34';
export const SECONDARY_COLOR = '#212224';

export const selectorStyles = {
    control: (baseStyles) => ({
        ...baseStyles,
        // borderColor: '#244153',
        border: '2px solid #244153',
        borderRadius: '10px',
        backgroundColor: '#0B1825',
        overflow: 'hidden',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#040B11' : state.isFocused ? '#0B1825' : '#0D1117', // Change the background color as needed
        color: state.isSelected ? '#808080' : 'white',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#0D1117',
        overflow: 'hidden',
        borderRadius: '15px',
        border: '2px solid #244153',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#2A3540',
    }),
}
export const multiSelectStyles = {
    multiValue: (base) => {
        return { ...base, backgroundColor: '#233A43', borderRadius: '7px', };
    },
    multiValueLabel: (base, state) => {
        return {
            ...base, fontWeight: 'bold',
            color: 'white',
            paddingRight: 6,
        };
    },
    multiValueRemove: (base, state) => {
        return state.data.isFixed ? { ...base, display: 'none' } : base;
    },
}

export const singleSelectStyles = {
    singleValue: (provided, state) => ({
        ...provided,
        color: 'white',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? 'black' : state.isFocused ? '#0B1825' : '#0D1117',
        color: 'white',
    }),
}

