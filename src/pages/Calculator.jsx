import Header from '../components/Header';
import Warning from './../components/Warning';

import iconArrow from '../assets/icons/iconArrow.png';

import './Calculator.css';

import { useEffect, useState } from 'react';

export default function Calculator() {

    const [bankItems, setBankItems] = useState([])

    const [choosedBank, setChoosedBank] = useState({})

    const [isChoosed, setChoosed] = useState(false)

    const [indexError, setIndexError] = useState(0)
    const [initialLoan, setInitialLoan] = useState('')
    const [downPayment, setDownPayment] = useState('')

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
    }, []);

    useEffect(() => {
        if(isChoosed) {
            if(((initialLoan > choosedBank.maximumLoan) || (initialLoan < 0)) && initialLoan !== '')
                setIndexError(1);
            else if(((downPayment < choosedBank.minimumDownPayment) || (downPayment < 0) || (downPayment > 100)) && downPayment !== '')
                setIndexError(2);
            else
                setIndexError(0);
        }
    }, [initialLoan, downPayment])

    useEffect(() => {
        setInitialLoan('')
        setDownPayment('')
    }, [choosedBank])

    const handlerChooseBank = (bankItem) => {
        setChoosedBank(bankItem)
        setChoosed(true)
    }

    const handlerCalculate = () => {
        if(isChoosed && indexError === 0 && initialLoan !== '' && downPayment !== '') {
            let M = (initialLoan*(choosedBank.interestRate/12)*(Math.pow(1 + choosedBank.interestRate/12, choosedBank.loanTerm*12))) / Math.pow(1 + choosedBank.interestRate/12, choosedBank.loanTerm*12) - 1 
            alert('Your monthly payment for your loan term would be ' + M)
        }

        else
            alert('Choose the bank and enter the values')
    }

    return(
        <div className = 'calculator-wrapper'>
           
            <Header styleClassFirstTab = 'button-inactive' styleClassSecondTab = 'button-active' stylesLinkFirst = {styles.blackTheme} stylesLinkSecond = {styles.whiteTheme}/>
           
            <div className = 'calculator-container'>
               
                <div className = 'calculator-content'>
                    
                    <h4 style = {{marginBlock: 0}}>Here you can calculate your monthly mortgage payment</h4>
                    
                    <div className = 'calculator-fields'>Choose the bank from the list 
                        <img src = {iconArrow} height = '10px' style = {{marginLeft: 6}} alt = ''/>
                        <div className = 'calculator-banks-menu'>
                            {
                                bankItems.map(bankItem => <div style = {{backgroundColor: '#EAEAEA', padding: 8, margin: 4, cursor: 'pointer'}} onClick = {() => handlerChooseBank(bankItem)}>{bankItem.bankName}</div>)
                            }
                        </div>
                    </div>

                    
                    <div>
                        <p>Bank name: {choosedBank.bankName}</p>
                        <p>Interest rate: {choosedBank.interestRate}%</p>
                        <p>Loan term: {choosedBank.loanTerm} years</p>
                        <p>Minimum down payment: {choosedBank.minimumDownPayment}%</p>
                    </div>

                    <input type="text" placeholder = 'Enter initial loan' className = 'calculator-fields' value = {initialLoan} onChange = {(e) => setInitialLoan(e.target.value)}/>
                    {indexError === 1 ? <Warning textWarning = 'Your entered loan is more than the max loan of the bank or wrong value'/> : false}
                    <input type="text" placeholder = 'Enter down payment' className = 'calculator-fields' value = {downPayment} onChange = {(e) => setDownPayment(e.target.value)}/>
                    {indexError === 2 ? <Warning textWarning = 'Your entered down payment is less than the min down payment of the bank or wrong value'/> : false}
                    <button onClick = {handlerCalculate}>Calculate</button>
                
                </div>
            </div>
        </div>
    );
}

const styles = {
    whiteTheme: {
        color: 'black',
        textDecoration: 'none'
    },
    blackTheme: {
        color: 'white',
        textDecoration: 'none'
    }
}