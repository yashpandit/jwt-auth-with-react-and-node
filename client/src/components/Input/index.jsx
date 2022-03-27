const Input = (props) => {
  const { id, type, className, label, ...rest } = props;

  if (type !== 'text' && type !== 'password') {
    console.error('only text and password input types are allowed');

    return <></>;
  }

  return (
    <div className="flex flex-col justify-center gap-1">
      <label className="text-gray-500" htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        className={`border rounded border-gray-300 px-2 py-1 ${className}`}
        {...rest}
      />
    </div>
  )
};

export default Input;

Input.defaulProps = {
  id: '',
  type: 'text',
  className: '',
  label: '',
};
