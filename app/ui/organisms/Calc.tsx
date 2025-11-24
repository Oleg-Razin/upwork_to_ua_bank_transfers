"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { FEES, UPWORK_ADDITIONAL_FEE, EP, MILITARY_TAX } from "@/app/lib/fees";
import { getPbCourse, getMonoCourse } from "@/app/lib/courses";
import type { FeesTypes } from "@/app/types/courses";
import {
  WithdrawalMethod,
  ContractType,
  ContractFees,
} from "@/app/types/enums";
import Input from "../atoms/Input";
import Radio from "../atoms/Radio";
import Button from "../atoms/Button";
import WithdrawalOption from "../molecules/WithdrawalOption";

const Calc = () => {
  const [contractType, setContractType] = useState<ContractType>(
    ContractType.Hourly
  );
  const [withdrawalMethod, setWithdrawalMethod] = useState<WithdrawalMethod>(
    WithdrawalMethod.Payoneer
  );
  const [upworkFeeRate, setUpworkFeeRate] = useState(ContractFees.Ten);

  const [hourlyRate, setHourlyRate] = useState(25);
  const [hoursWorked, setHoursWorked] = useState(40);

  // Fixed contract field
  const [fixedAmount, setFixedAmount] = useState(1000);

  // Exchange rates state
  const [pbRate, setPbRate] = useState<number | null>(null);
  const [monoRate, setMonoRate] = useState<number | null>(null);

  // Fetch exchange rates on component mount
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const [pbCourse, monoCourse] = await Promise.all([
          getPbCourse(),
          getMonoCourse()
        ]);
        setPbRate(pbCourse || null);
        setMonoRate(monoCourse || null);
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
      }
    };
    
    fetchRates();
  }, []);

  // Helper functions using useCallback to avoid dependency warnings
  const calculateUpworkFee = useCallback(
    (amount: number) => {
      const baseFee = amount * upworkFeeRate;
      const additionalFee = baseFee * UPWORK_ADDITIONAL_FEE;
      return baseFee + additionalFee;
    },
    [upworkFeeRate]
  );

  const calculateWithdrawalFee = useCallback(
    (amount: number, method: WithdrawalMethod) => {
      const feeConfig = FEES.find((fee) => fee.name === method) as FeesTypes;
      return (
        feeConfig.fixed +
        (feeConfig.percentage ? amount * feeConfig.percentage : 0)
      );
    },
    []
  );

  // Calculated values using useMemo for derived state
  const grossAmount = useMemo(() => {
    return contractType === ContractType.Hourly
      ? hourlyRate * hoursWorked
      : fixedAmount;
  }, [contractType, hourlyRate, hoursWorked, fixedAmount]);

  const upworkFee = useMemo(() => {
    return calculateUpworkFee(grossAmount);
  }, [grossAmount, calculateUpworkFee]);

  const netAfterUpwork = useMemo(() => {
    return grossAmount - upworkFee;
  }, [grossAmount, upworkFee]);

  const withdrawalFee = useMemo(() => {
    return netAfterUpwork > 0
      ? calculateWithdrawalFee(netAfterUpwork, withdrawalMethod)
      : 0;
  }, [netAfterUpwork, withdrawalMethod, calculateWithdrawalFee]);

  const finalAmount = useMemo(() => {
    return netAfterUpwork - withdrawalFee;
  }, [netAfterUpwork, withdrawalFee]);

  // Calculate fees for both methods to show comparison
  const payoneerFee = useMemo(() => {
    return netAfterUpwork > 0
      ? calculateWithdrawalFee(netAfterUpwork, WithdrawalMethod.Payoneer)
      : 0;
  }, [netAfterUpwork, calculateWithdrawalFee]);

  const bankFee = useMemo(() => {
    return netAfterUpwork > 0
      ? calculateWithdrawalFee(netAfterUpwork, WithdrawalMethod.BankTransfer)
      : 0;
  }, [netAfterUpwork, calculateWithdrawalFee]);

  const bestMethod = useMemo(() => {
    return payoneerFee <= bankFee
      ? WithdrawalMethod.Payoneer
      : WithdrawalMethod.BankTransfer;
  }, [payoneerFee, bankFee]);

  // Exchange rate calculations
  const pbAmount = useMemo(() => {
    return pbRate ? finalAmount * pbRate : 0;
  }, [finalAmount, pbRate]);

  const monoAmount = useMemo(() => {
    return monoRate ? finalAmount * monoRate : 0;
  }, [finalAmount, monoRate]);

  // Tax calculations (5% EP + 1.5% Military Tax)
  const pbTaxes = useMemo(() => {
    const epTax = pbAmount * EP;
    const militaryTax = pbAmount * MILITARY_TAX;
    return { epTax, militaryTax, total: epTax + militaryTax };
  }, [pbAmount]);

  const monoTaxes = useMemo(() => {
    const epTax = monoAmount * EP;
    const militaryTax = monoAmount * MILITARY_TAX;
    return { epTax, militaryTax, total: epTax + militaryTax };
  }, [monoAmount]);

  // Final amounts after taxes (net amounts in UAH)
  const pbFinalAmount = pbAmount - pbTaxes.total;
  const monoFinalAmount = monoAmount - monoTaxes.total;

  return (
    <div className="p-6 mx-auto md:flex md:gap-6">
      {/* Contract Type Selection */}
      <div className="md:w-6/12 lg:w-8/12 bg-secondary p-6 md:p-10 space-y-6 shadow-sm">
        <div>
          <label className="block text-sm font-medium mb-3">
            Тип контракту:
          </label>
          <div className="flex gap-4">
            <Radio
              name="contractType"
              value={ContractType.Hourly}
              label="Погодинний"
              checked={contractType === ContractType.Hourly}
              onChange={(value) => setContractType(value as ContractType)}
            />
            <Radio
              name="contractType"
              value={ContractType.Fixed}
              label="Фіксована ціна"
              checked={contractType === ContractType.Fixed}
              onChange={(value) => setContractType(value as ContractType)}
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">
            Комісія Upwork (+ 20% від суми комісії VAT):
          </label>
          <div className="flex gap-4 flex-wrap">
            <Radio
              name="upworkFeeRate"
              value={ContractFees.Ten}
              label="10%"
              checked={upworkFeeRate === ContractFees.Ten}
              onChange={(value) => setUpworkFeeRate(Number(value))}
            />
            <Radio
              name="upworkFeeRate"
              value={ContractFees.Five}
              label="5%"
              checked={upworkFeeRate === ContractFees.Five}
              onChange={(value) => setUpworkFeeRate(Number(value))}
            />
            <Radio
              name="upworkFeeRate"
              value={ContractFees.Three}
              label="3%"
              checked={upworkFeeRate === ContractFees.Three}
              onChange={(value) => setUpworkFeeRate(Number(value))}
            />
            <Radio
              name="upworkFeeRate"
              value={ContractFees.Zero}
              label="0%"
              checked={upworkFeeRate === ContractFees.Zero}
              onChange={(value) => setUpworkFeeRate(Number(value))}
            />
          </div>
        </div>
        {contractType === ContractType.Hourly ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Input
              label="Ставка за годину (USD):"
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              min="0"
              step="0.5"
            />
            <Input
              label="Кількість годин:"
              type="number"
              value={hoursWorked}
              onChange={(e) => setHoursWorked(Number(e.target.value))}
              min="0"
              step="0.1"
            />
          </div>
        ) : (
          <div className="mb-6">
            <Input
              label="Фіксована сума (USD):"
              type="number"
              value={fixedAmount}
              onChange={(e) => setFixedAmount(Number(e.target.value))}
              min="0"
              step="0.01"
            />
          </div>
        )}

        {/* Withdrawal Method Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">
            Спосіб виводу:
          </label>

          {/* Best method recommendation */}
          <div className="mb-3 p-3 bg-green-50 border border-green-500 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <span className="text-green-500 font-medium">
                💡 Рекомендація:
              </span>
              <span className="text-black">
                {bestMethod === WithdrawalMethod.Payoneer
                  ? "Payoneer"
                  : "Банківський переказ"}
                (економія ${Math.abs(payoneerFee - bankFee).toFixed(2)})
              </span>
            </div>
            <Button
              onClick={() => setWithdrawalMethod(bestMethod)}
              variant="primary"
            >
              Обрати
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Payoneer Option */}
            <WithdrawalOption
              method={WithdrawalMethod.Payoneer}
              isSelected={withdrawalMethod === WithdrawalMethod.Payoneer}
              onSelect={setWithdrawalMethod}
              title="Payoneer"
              description="$1 + 3%"
              fee={payoneerFee}
              icon="/payoneer-icon.png"
              alt="Payoneer"
            />
            
            <WithdrawalOption
              method={WithdrawalMethod.BankTransfer}
              isSelected={withdrawalMethod === WithdrawalMethod.BankTransfer}
              onSelect={setWithdrawalMethod}
              title="Банківський переказ"
              description="Фіксована комісія"
              fee={bankFee}
              icon="/bank.svg"
              alt="Bank Transfer"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white p-6 md:p-10 space-y-3 shadow-sm">
        <div className="flex justify-between">
          <span>Валова сума:</span>
          <span className="font-semibold">${grossAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-red-600">
          <span>
            Комісія Upwork ({(upworkFeeRate * 100).toFixed(0)}% + 20% VAT):
          </span>
          <span>-${upworkFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Після комісії Upwork:</span>
          <span>${netAfterUpwork.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-red-600">
          <span>
            Комісія за вивід (
            {withdrawalMethod === WithdrawalMethod.Payoneer
              ? "Payoneer"
              : "Банк"}
            ):
          </span>
          <span>-${withdrawalFee.toFixed(2)}</span>
        </div>
        <hr className="border-gray-300" />
        <div className="flex justify-between text-lg font-bold text-green-600">
          <span>Підсумок до отримання (USD):</span>
          <span>${finalAmount.toFixed(2)}</span>
        </div>
        
        {/* Exchange Rate Section */}
        {(pbRate || monoRate) && (
          <>
            <hr className="border-gray-300 mt-6" />
            <div className="mt-4">
              <h4 className="font-semibold text-gray-900 mb-3">Конвертація в гривні:</h4>
              
              {/* PrivatBank */}
              {pbRate && (
                <div className="bg-gray-50 p-4 mb-4 border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">ПриватБанк</span>
                    <span className="text-sm text-gray-600">Курс: {pbRate.toFixed(2)} грн/$</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Сума до оподаткування:</span>
                    <span>{pbAmount.toFixed(2)} грн</span>
                  </div>
                  <div className="flex justify-between text-sm text-red-600">
                    <span>Податок на прибуток (5%):</span>
                    <span>-{pbTaxes.epTax.toFixed(2)} грн</span>
                  </div>
                  <div className="flex justify-between text-sm text-red-600">
                    <span>Військовий збір (1.5%):</span>
                    <span>-{pbTaxes.militaryTax.toFixed(2)} грн</span>
                  </div>
                  <hr className="border-gray-300 my-2" />
                  <div className="flex justify-between font-bold text-green-600">
                    <span>До отримання:</span>
                    <span>{pbFinalAmount.toFixed(2)} грн</span>
                  </div>
                </div>
              )}
              
              {/* MonoBank */}
              {monoRate && (
                <div className="bg-gray-50 p-4 border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Монобанк</span>
                    <span className="text-sm text-gray-600">Курс: {monoRate.toFixed(2)} грн/$</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Сума до оподаткування:</span>
                    <span>{monoAmount.toFixed(2)} грн</span>
                  </div>
                  <div className="flex justify-between text-sm text-red-600">
                    <span>Податок на прибуток (5%):</span>
                    <span>-{monoTaxes.epTax.toFixed(2)} грн</span>
                  </div>
                  <div className="flex justify-between text-sm text-red-600">
                    <span>Військовий збір (1.5%):</span>
                    <span>-{monoTaxes.militaryTax.toFixed(2)} грн</span>
                  </div>
                  <hr className="border-gray-300 my-2" />
                  <div className="flex justify-between font-bold text-green-600">
                    <span>До отримання:</span>
                    <span>{monoFinalAmount.toFixed(2)} грн</span>
                  </div>
                </div>
              )}
              
              {!pbRate && !monoRate && (
                <div className="text-center text-gray-500 py-4">
                  Завантаження курсів валют...
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Calc;
