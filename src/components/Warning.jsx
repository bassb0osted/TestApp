import iconWarning from '../assets/icons/warning.png'

export default function Warning({textWarning}) {
    return(
        <div style = {{display:'flex', flexDirection: 'row', alignContent: 'center'}}>
            <img src = {iconWarning} height = '20px' alt = ''/>
            <p style = {{fontFamily: 'Roboto', fontSize: 12, fontWeight: 500, color: 'red', marginBlock: 0}}>{textWarning}</p>
        </div>
    );
}