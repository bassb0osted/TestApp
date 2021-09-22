import './AddBank.css';
import Form from './Form';

export default function AddBank({setDataChanged, dataChanged}) {

    const handlerAddBank = async (indexError, data) => {
        try {
            if(indexError === 0) {
                await fetch('https://guarded-anchorage-75835.herokuapp.com/api/banks', {
                    method: 'POST',
                    body: JSON.stringify(data),
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
        <div className = 'addbank-wrapper'>
            <h2 style = {{fontFamily: 'Roboto', fontWeight: 500, fontSize: 20, marginBlockStart: 0, marginBlockEnd: 5}}>Add new bank</h2>
            <Form handler = {handlerAddBank} buttonText = {'Add Bank'}/>
        </div>
    );
}