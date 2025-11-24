interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  value: string | number;
  checked?: boolean;
  onChange?: (value: string | number) => void;
  className?: string;
}

const Radio = ({ 
  label, 
  name, 
  value, 
  checked = false, 
  onChange, 
  className = '',
  ...props 
}: RadioProps) => {
  const handleChange = () => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <label 
      className={`
        cursor-pointer block px-4 py-2 border border-black text-black transition-colors
        ${checked 
          ? 'bg-black text-white' 
          : 'bg-white text-black hover:bg-primary'
        }
        ${className}
      `}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        className="sr-only"
        {...props}
      />
      {label}
    </label>
  );
};

export default Radio;
