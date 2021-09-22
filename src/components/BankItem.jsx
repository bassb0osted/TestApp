import './BankItem.css';

import iconInterestRate from '../assets/icons/interestRate.png'
import iconLoan from '../assets/icons/loan.png'
import iconDownPayment from '../assets/icons/downPayment.png'
import iconLoanTerm from '../assets/icons/loanTerm.png'
import iconCardFee from '../assets/icons/cardFee.png'
import iconDeposit from '../assets/icons/deposit.png'
import iconEdit from '../assets/icons/edit.png'
import iconTrashCan from '../assets/icons/trashCan.png'

import Form from './Form';

export default function BankItem({ bankName, interestRate, loan, donwPayment, loanTerm, cardFee, depositInterestRate, id, dataChanged, setDataChanged}) {
    const handlerDelete = async () => {
        try{
            await fetch('https://guarded-anchorage-75835.herokuapp.com/api/banks', {
                method: 'DELETE',
                body: JSON.stringify({"_id":id}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setDataChanged(!dataChanged)
        } catch(e) {
            console.log(e)
        }
    }

    const handlerUpdate = async (indexError, data) => {
        Object.filter = (obj, predicate) => 
            Object.keys(obj)
                .filter( key => predicate(obj[key]) )
                    .reduce( (res, key) => (res[key] = obj[key], res), {} );
        
        let filteredData = Object.filter(data, value => value.length > 0)
        filteredData._id = id
        
        try {
            if(indexError === 0) {
                await fetch('https://guarded-anchorage-75835.herokuapp.com/api/banks', {
                    method: 'PUT',
                    body: JSON.stringify(filteredData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                setDataChanged(!dataChanged)
            }
            else {
                alert('Correct any errors in the fields')
            }
        } catch(e) {
            console.log(e)
        }
    }

    return(
        <div className = 'bankitem-wrapper'>
            <div className = 'bankitem-content'>

                <h2 style = {{color: '#002A97', fontSize: 20, marginBlockStart: 0, marginBlockEnd: 0}}>{bankName}</h2>

                <div className = 'content-data'>
                    <div>
                        <div>
                            <img src = {iconInterestRate} alt = ''/>
                            <p>Interest rate: <span>{interestRate}%</span></p>
                        </div>
                        <div>
                            <img src = {iconLoan} alt = ''/>
                            <p>Maximum loan: <span>{loan}$</span></p>
                        </div>
                        <div>
                            <img src = {iconDownPayment} alt = ''/>
                            <p>Minimum down payment: <span>{donwPayment}%</span></p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src = {iconLoanTerm} alt = ''/>
                            <p>Loan term: <span>{loanTerm} years</span></p>
                        </div>
                        <div>
                            <img src = {iconCardFee} alt = ''/>
                            <p>Card transaction fee: <span>{cardFee}%</span></p>
                        </div>
                        <div>
                            <img src = {iconDeposit} alt = ''/>
                            <p>Minimum deposit intereset rate: <span>{depositInterestRate}%</span></p>
                        </div>
                    </div>
                    <div className = 'content-data-buttons'>
                        <div className = 'delete-button' onClick = {handlerDelete}>
                            <img src = {iconTrashCan} alt = ''/>
                            Delete
                        </div>
                        <div className = 'edit-button'>
                            <img src = {iconEdit} alt = ''/>
                            Edit
                            <div className = 'edit-menu'>
                                <Form handler = {handlerUpdate} buttonText = {'Edit'} headerText = {'Enter the values in the fields you want to change'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}