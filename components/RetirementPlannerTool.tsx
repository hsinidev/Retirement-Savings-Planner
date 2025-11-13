import React, { useState, useCallback } from 'react';
import { calculateRetirementPlan, PlannerInput, PlannerOutput } from '../services/FinancialMath';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

const InputField: React.FC<{label: string, id: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type?: string, symbol?: string, placeholder?: string}> = ({ label, id, value, onChange, type = 'number', symbol, placeholder }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
        <div className="relative">
            {symbol && <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">{symbol}</span>}
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full bg-slate-800/50 border border-slate-700 rounded-md shadow-sm py-2 text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition ${symbol ? 'pl-7' : 'px-3'}`}
                min="0"
            />
        </div>
    </div>
);

// FIX: Changed JSX.Element to React.ReactNode to resolve "Cannot find namespace 'JSX'" error.
const ResultCard: React.FC<{title: string, value: string, subtext: string, icon: React.ReactNode}> = ({title, value, subtext, icon}) => (
    <div className="bg-slate-900/50 p-4 rounded-lg text-center flex flex-col items-center">
        <div className="text-violet-400 mb-2">{icon}</div>
        <p className="text-md text-slate-400">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
        <p className="text-xs text-slate-500">{subtext}</p>
    </div>
);


const RetirementPlannerTool: React.FC = () => {
    const [inputs, setInputs] = useState({
        currentAge: '30',
        currentSavings: '50000',
        annualSalary: '80000',
        annualContribution: '10',
        desiredAnnualIncome: '60000',
        annualReturn: '7',
        inflationRate: '3',
    });
    const [result, setResult] = useState<PlannerOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setInputs(prev => ({ ...prev, [id]: value }));
    };

    const handleCalculate = useCallback(() => {
        setError('');
        setResult(null);

        // FIX: Renamed property 'key' to 'inputKey' to avoid potential conflicts and type errors.
        const numericInputs = Object.entries(inputs).map(([key, value]) => ({ inputKey: key, value: parseFloat(value) }));
        const invalidInput = numericInputs.find(input => isNaN(input.value) || input.value < 0);

        if (invalidInput) {
            setError(`Please enter a valid, non-negative number for ${invalidInput.inputKey}.`);
            return;
        }

        setIsLoading(true);

        const plannerInput: PlannerInput = {
            currentAge: parseFloat(inputs.currentAge),
            currentSavings: parseFloat(inputs.currentSavings),
            annualContribution: parseFloat(inputs.annualSalary) * (parseFloat(inputs.annualContribution) / 100),
            annualReturn: parseFloat(inputs.annualReturn),
            desiredAnnualIncome: parseFloat(inputs.desiredAnnualIncome),
            inflationRate: parseFloat(inputs.inflationRate),
        };
        
        setTimeout(() => {
            const plan = calculateRetirementPlan(plannerInput);
            setResult(plan);
            setIsLoading(false);
        }, 1000);
    }, [inputs]);

    return (
        <div className="w-full max-w-4xl bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-6 md:p-8 grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-white mb-1">Your Financial Details</h2>
                <p className="text-slate-400 mb-4 text-sm">Fill in the fields to project your retirement.</p>
                <div className="space-y-4">
                    <InputField label="Current Age" id="currentAge" value={inputs.currentAge} onChange={handleInputChange} placeholder="e.g., 30"/>
                    <InputField label="Current Savings" id="currentSavings" value={inputs.currentSavings} onChange={handleInputChange} symbol="$" placeholder="e.g., 50000"/>
                    <InputField label="Annual Salary" id="annualSalary" value={inputs.annualSalary} onChange={handleInputChange} symbol="$" placeholder="e.g., 80000"/>
                    <div className="grid grid-cols-2 gap-4">
                        <InputField label="Contribution" id="annualContribution" value={inputs.annualContribution} onChange={handleInputChange} symbol="%" placeholder="e.g., 10"/>
                        <InputField label="Est. Return" id="annualReturn" value={inputs.annualReturn} onChange={handleInputChange} symbol="%" placeholder="e.g., 7"/>
                    </div>
                    <InputField label="Desired Annual Retirement Income" id="desiredAnnualIncome" value={inputs.desiredAnnualIncome} onChange={handleInputChange} symbol="$" placeholder="e.g., 60000"/>
                    <InputField label="Inflation Rate" id="inflationRate" value={inputs.inflationRate} onChange={handleInputChange} symbol="%" placeholder="e.g., 3"/>
                </div>
                
                <button 
                    onClick={handleCalculate}
                    disabled={isLoading}
                    className="w-full mt-6 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-violet-500/50 disabled:bg-slate-500 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : 'Calculate Retirement Plan'}
                </button>
                {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
            </div>

            {/* Output Section */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-white mb-4 text-center">Your Retirement Outlook</h2>
                
                {isLoading && <div className="text-center text-slate-300">Calculating your future...</div>}
                
                {result && (
                    <div className="space-y-4">
                        {result.canRetire ? (
                            <div className="text-center mb-4">
                                <p className="text-lg text-slate-300">You're on track to retire at age:</p>
                                <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-400 my-2">{result.retirementAge}</p>
                            </div>
                        ) : (
                             <div className="text-center mb-4 p-4 bg-amber-900/30 border border-amber-500/50 rounded-lg">
                                <p className="text-lg text-slate-300">With current savings, you may not reach your goal by age 100.</p>
                                <p className="text-2xl font-bold text-amber-400 my-1">Action May Be Required</p>
                            </div>
                        )}

                        <div className="space-y-4">
                           <ResultCard 
                                title="Total Nest Egg Needed"
                                value={formatCurrency(result.nestEgg)}
                                subtext="(at retirement age, in future dollars)"
                                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                           />
                           <ResultCard 
                                title={result.canRetire ? 'Based on Your Plan' : 'To Retire at 65'}
                                value={formatCurrency(result.requiredMonthlySavings)}
                                subtext="required monthly savings"
                                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>}
                           />
                        </div>
                    </div>
                )}

                {!isLoading && !result && (
                    <div className="text-center text-slate-400 flex flex-col items-center justify-center h-full">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                        <p>Your personalized retirement forecast will appear here.</p>
                        <p className="text-sm text-slate-500">Fill out the form to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RetirementPlannerTool;