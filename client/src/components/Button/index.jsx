const Button = (props) => {
  const { children, className, theme, ...rest } = props;

  const themeClass = theme === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'

  return (
    <button
      className={`cursor-pointer py-2 px-3 border rounded ${themeClass} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
};

export default Button;

Button.defaultProps = {
  children: '',
  className: '',
  theme: '',
};
