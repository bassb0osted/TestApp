import './Header.css'
import { Link } from 'react-router-dom';

export default function Header({styleClassFirstTab, styleClassSecondTab, stylesLinkFirst, stylesLinkSecond}) {


    return(
        <header className = 'header-wrapper'>
            <ul className = 'header-menu'>
                <li className = {`header-menu-button ${styleClassFirstTab}`}>
                    <Link to="/" style = {stylesLinkFirst}>Banks managment</Link>
                </li>
                <li className = {`header-menu-button ${styleClassSecondTab}`}>
                    <Link to="/calculator" style = {stylesLinkSecond}>Mortage calculator</Link>
                </li>
            </ul>
        </header>
    );
}