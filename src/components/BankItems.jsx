import './BankItems.css';

import BankItem from './BankItem'

import { useEffect, useState } from 'react'

export default function BankItems({dataChanged, setDataChanged}) {

    const [bankItems, setBankItems] = useState([])

    async function fetchData() {
        try {
            let response = await fetch('https://guarded-anchorage-75835.herokuapp.com/api/banks')
            let commits = await response.json()
            setBankItems(commits)
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchData()
    }, [dataChanged]);

    return(
        <div className = 'bankitems-wrapper'>
            <h2 style = {{fontFamily: 'Roboto', fontWeight: 500, fontSize: 20, marginBlockStart: 0, marginBlockEnd: 5}}>Added banks</h2>

            <div className = 'bankitems-content'>

                {
                    bankItems.length === 0 ?
                    <div style = {{width: '60vw', fontFamily: 'Roboto', fontSize: 18, color: '#737373'}}>You have not added any banks yet</div>
                    :
                    bankItems.map((bankItem, index) => <BankItem
                                              key = {`${bankItem.bankName + index}}`} 
                                              id = {bankItem._id} 
                                              bankName = {bankItem.bankName}
                                              interestRate = {bankItem.interestRate}
                                              loan = {bankItem.maximumLoan}
                                              donwPayment = {bankItem.minimumDownPayment}
                                              loanTerm = {bankItem.loanTerm}
                                              cardFee = {bankItem.cardTransactionFee}
                                              depositInterestRate = {bankItem.minimumDepositInterestRate}
                                              dataChanged = {dataChanged}
                                              setDataChanged = {setDataChanged}/>)
                }
                
            </div>

        </div>
    );
}