interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = ({ 
  label, 
  error, 
  helperText, 
  className = '', 
  ...props 
}: InputProps) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-2 border border-black text-base bg-white
          focus:ring-2 focus:ring-black focus:border-transparent
          disabled:bg-gray-50 disabled:cursor-not-allowed
          ${error 
            ? 'border-red-300 focus:ring-red-500' 
            : 'border-black'
          }
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;