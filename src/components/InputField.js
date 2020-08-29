import React from "react";

export default function InputField(props) {
  return (
    <div className="field">
      <p className="control has-icons-left has-icons-right">
        <input
          id={props.id}
          name={props.name}
          className={props.classes}
          type={props.type}
          placeholder={props.placeholder}
          minLength={props.minLength}
          required={props.required}
          onChange={(e) => {
            props.onChange(e.target.value);
          }}
        />
        <span className="icon is-small is-left has-text-white">
          <i className={props.icon}></i>
        </span>
      </p>
    </div>
  );
}
