import { useEffect, useState } from 'react';
import Warning from './Warning';

import './Form.css'

export default function Form({handler, buttonText, headerText}) {

    const [bankName, setBankName] = useState('')
    const [interestRate, setInterestRate] = useState('')
    const [cardTransactionFee, setCardTransactionFee] = useState('')
    const [loanTerm, setLoanTerm] = useState('')
    const [maximumLoan, setMaximumLoan] = useState('')
    const [minimumDepositInterestRate, setMinimumDepositInterestRate] = useState('')
    const [minimumDownPayment, setMinimumDownPayment] = useState('')

    const [indexError, setIndexError] = useState(0)
    
    const data = {
        bankName: bankName,
        interestRate: interestRate,
        cardTransactionFee: cardTransactionFee,
        loanTerm: loanTerm,
        maximumLoan: maximumLoan,
        minimumDepositInterestRate: minimumDepositInterestRate,
        minimumDownPayment: minimumDownPayment
    }

    const validation = () => {
        if((interestRate < 0 || interestRate > 100) && interestRate !== '')
            setIndexError(1)
        else if((maximumLoan <= 0) && maximumLoan !== '')
            setIndexError(2)
        else if((minimumDownPayment < 0 || minimumDownPayment > 100) && minimumDownPayment !== '')
            setIndexError(3)
        else if((loanTerm < 0) && loanTerm !== '')
            setIndexError(4)
        else if((cardTransactionFee < 0 || cardTransactionFee > 100) && cardTransactionFee !== '')
            setIndexError(5)
        else if((minimumDepositInterestRate <= 0 || minimumDepositInterestRate >= 100) && minimumDepositInterestRate !== '')
            setIndexError(6)
        else
            setIndexError(0)
    }
    useEffect(validation)

    return(
        <form className = 'addbank-form' onSubmit = {e => e.preventDefault()}>
            <h4 style = {{marginBlock: 0, margin: 4}}>{headerText}</h4>
            
            <input type = 'text' placeholder = 'Bank name' value = {bankName} onChange = {(e) => setBankName(e.target.value)}></input>
            
            <input type = 'text' placeholder = 'Interest rate' value = {interestRate} onChange = {(e) => setInterestRate(e.target.value)}></input>
            {indexError === 1 ? <Warning textWarning = 'This field can take values from 1 - 100'/> : false}
            
            <input type = 'text' placeholder = 'Maximum loan' value = {maximumLoan} onChange = {(e) => setMaximumLoan(e.target.value)}></input>
            {indexError === 2 ? <Warning textWarning = 'This field can take value greater than 0'/> : false}
           
           <input type = 'text' placeholder = 'Minimum down payment' value = {minimumDownPayment} onChange = {(e) => setMinimumDownPayment(e.target.value)}></input>
            {indexError === 3 ? <Warning textWarning = 'This field can take values from 0 - 100'/> : false}
            
            <input type = 'text' placeholder = 'Loan term' value = {loanTerm} onChange = {(e) => setLoanTerm(e.target.value)}></input>
            {indexError === 4 ? <Warning textWarning = 'This field can take value greater than 0'/> : false}
            
            <input type = 'text' placeholder = 'Card transaction fee' value = {cardTransactionFee} onChange = {(e) => setCardTransactionFee(e.target.value)}></input>
            {indexError === 5 ? <Warning textWarning = 'This field can take values from 0 - 100'/> : false}
            
            <input type = 'text' placeholder = 'Min deposit interest rate' value = {minimumDepositInterestRate} onChange = {(e) => setMinimumDepositInterestRate(e.target.value)}></input>
            {indexError === 6 ? <Warning textWarning = 'This field can take values from 1 - 100'/> : false}
            
            <button onClick = {() => handler(indexError, data)}>{buttonText}</button>
        </form>
    );
}