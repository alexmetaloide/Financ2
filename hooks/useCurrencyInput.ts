import { useState } from 'react';

export const useCurrencyInput = (initialValue: number = 0) => {
    const [displayValue, setDisplayValue] = useState(formatCurrencyForInput(initialValue));
    const [numericValue, setNumericValue] = useState(initialValue);

    const handleChange = (value: string) => {
        // Remove all non-digit characters
        const onlyDigits = value.replace(/\D/g, '');

        // Convert to number (cents)
        const cents = parseInt(onlyDigits || '0', 10);
        const numeric = cents / 100;

        // Update values
        setNumericValue(numeric);
        setDisplayValue(formatCurrencyForInput(numeric));
    };

    return {
        displayValue,
        numericValue,
        handleChange,
        setValue: (value: number) => {
            setNumericValue(value);
            setDisplayValue(formatCurrencyForInput(value));
        }
    };
};

function formatCurrencyForInput(value: number): string {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
