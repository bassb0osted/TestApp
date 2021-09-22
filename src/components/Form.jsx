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

        if(interestRate !== '' && isNaN(parseInt(interestRate)) || (interestRate < 0 || interestRate > 100))
            setIndexError(1)

        else if(maximumLoan !== '' && isNaN(parseInt(maximumLoan)) || maximumLoan < 0)
            setIndexError(2)
        else if(minimumDownPayment !== '' && isNaN(parseInt(minimumDownPayment)) || minimumDownPayment < 0 || minimumDownPayment > 100)
            setIndexError(3)
        else if(loanTerm !== '' && isNaN(parseInt(loanTerm)) || loanTerm < 0)
            setIndexError(4)
        else if(cardTransactionFee !== '' && isNaN(parseInt(cardTransactionFee)) || cardTransactionFee < 0 || cardTransactionFee > 100)
            setIndexError(5)
        else if(minimumDepositInterestRate !== '' && isNaN(parseInt(minimumDepositInterestRate)) || minimumDepositInterestRate < 0 || minimumDepositInterestRate >= 100)
            setIndexError(6)
        else
            setIndexError(0)
    }
    useEffect(validation)

    return(
        <form className = 'addbank-form' onSubmit = {e => e.preventDefault()}>
            <h4 style = {{marginBlock: 0, margin: 4}}>{headerText}</h4>

            <p>Everywhere except "bank name"<br></br> enter only numbers</p>
            
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