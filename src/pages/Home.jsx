import { useState } from 'react';
import AddBank from '../components/AddBank';
import BankItems from '../components/BankItems';
import Header from '../components/Header';
import './Home.css';

export default function Home() {
    const [dataChanged, setDataChanged] = useState(false)
    return(
        <div className = 'home-wrapper'>
            
            <Header styleClassFirstTab = 'button-active' styleClassSecondTab = 'button-inactive' stylesLinkFirst = {styles.whiteTheme} stylesLinkSecond = {styles.blackTheme}/>

            <div className = 'home-content'>

                <AddBank setDataChanged = {setDataChanged} dataChanged = {dataChanged}/>
                
                <BankItems setDataChanged = {setDataChanged} dataChanged = {dataChanged}/>

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