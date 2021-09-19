import React from 'react';

// eslint-disable-next-line
const Switch = (prop: { onChange: any; isChecked: boolean; label: string }) => {
  const { onChange, isChecked, label } = prop;
  const id = label.replace(' ', '-').toLowerCase();
  return (
    <div className="flex items-center px-2 text-red-400 align-middle flow-row">
      <label htmlFor={id} className="flex items-center">
        <input
          className="w-4 h-4 mr-2"
          id={id}
          name={id}
          type="checkbox"
          defaultChecked={isChecked}
          onChange={onChange}
        />
        {label}
      </label>
    </div>
  );
};
export default Switch;
