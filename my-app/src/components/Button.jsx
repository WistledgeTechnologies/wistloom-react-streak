const Button = ( { 
  children,
  title,
  type = "button",
  onClick,
  disabled = false,
  variant = "primary",
  size = "small",
  className = ""
}) => {

  const baseStyles = ' rounded-3xl font-bold duration-200 transition-all focus:outline-none font-medium border-none';

  const variants = {
    danger: 'bg-red-500 text-white hover:bg-red-300',
    primary: 'bg-blue-500 text-white hover:bg-blue-700',
    success: 'bg-green-500 text-white hover:bg-green-700',
    secondary: 'bg-gray-200 text-white hover:bg-gray-300',
    outline: 'bg-transparent text-blue-200 border-green-500'
  }

  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  } 

  return (
    <button 
    title={title}
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`
      ${baseStyles}
      ${variants[variant]}
      ${sizes[size]}
      ${className}`}
    >
      {children}
    </button>
  )
}

export default Button