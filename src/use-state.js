import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const App=()=>{
    return <HookApp/>
    //return <Person />
}

const HookApp =()=>{
    const [color,setColor] = useState('gray');
    const [fontSize,setFontSize] = useState(14);

    const setGreen=()=>setColor('green');
    //const setYellow=()=>setColor('yellow');

    return(
        <div>
            <div style={{background:color,fontSize:fontSize}} >Text</div>
            <button onClick={setGreen}>Green</button>
            <button onClick={()=>setColor('yellow')}>Yellow</button>
            <button onClick={()=>setFontSize(fontSize+1)}>+</button>
            <button onClick={()=>setFontSize(fontSize-1)}>-</button>

        </div>
    )

}

/*
const Person =()=>{
    const [person,setPerson] = useState({
        firstName: 'Mike',
        lastName: 'Jordan'
    });

    // setPerson((person)=>{
    //     return {...person,firstName:'Bob'}
    // })

    return (
        <div>
            <p>Person: {person}</p>
            <button onClick={()=>setPerson((person)=>{return {...person,firstName:'Bob'}})}>Change firstName</button>
        </div>
    )
}
*/
ReactDOM.render(
    <App/>,
  document.getElementById('root')
);

