interface RadioOption {
  value: string | number;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  label?: string;
  options: RadioOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  name: string;
  className?: string;
  direction?: 'horizontal' | 'vertical';
}

const RadioGroup = ({
  label,
  options,
  value,
  onChange,
  name,
  className = '',
  direction = 'horizontal'
}: RadioGroupProps) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className={`
        ${direction === 'horizontal' 
          ? 'flex flex-wrap gap-4' 
          : 'space-y-3'
        }
      `}>
        {options.map((option) => (
          <label key={option.value} className="flex items-center cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => {
                const val = e.target.value;
                onChange(isNaN(Number(val)) ? val : Number(val));
              }}
              className="mr-2 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">
                {option.label}
              </span>
              {option.description && (
                <p className="text-xs text-gray-500">{option.description}</p>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;