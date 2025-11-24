import Image from 'next/image';
import { WithdrawalMethod } from '@/app/types/enums';

interface WithdrawalOptionProps {
  method: WithdrawalMethod;
  isSelected: boolean;
  onSelect: (method: WithdrawalMethod) => void;
  title: string;
  description: string;
  fee: number;
  icon: string;
  alt: string;
}

const WithdrawalOption = ({
  method,
  isSelected,
  onSelect,
  title,
  description,
  fee,
  icon,
  alt
}: WithdrawalOptionProps) => {
  return (
    <label
      className={`cursor-pointer bg-white p-4 border-2 transition-all ${
        isSelected
          ? "border-black"
          : "border-gray-200 hover:border-gray-400"
      }`}
    >
      <input
        type="radio"
        value={method}
        checked={isSelected}
        onChange={() => onSelect(method)}
        className="sr-only"
      />
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          alt={alt}
          width={40}
          height={40}
          className="object-contain"
        />
        <div className="flex-1">
          <div className="font-medium text-black text-lg">{title}</div>
          <div className="text-sm text-gray-600">{description}</div>
          <div className="text-sm font-semibold text-black mt-1">
            ${fee.toFixed(2)}
          </div>
        </div>
        {isSelected && (
          <div className="w-6 h-6 bg-black flex items-center justify-center">
            <div className="w-3 h-3 bg-white"></div>
          </div>
        )}
      </div>
    </label>
  );
};


export default WithdrawalOption;