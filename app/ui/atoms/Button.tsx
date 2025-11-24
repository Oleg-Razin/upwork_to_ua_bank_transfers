interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const Button = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) => {
  const baseStyles = 'block items-center justify-center px-4 py-2 font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-secondary text-black hover:opacity-80'
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;