import React, {Component, useEffect, useState} from "react";
import ReactDOM from  'react-dom';

const App=()=>{
    const [value,setValue] = useState(0);
    const [visible,setVisible] = useState(true);
    if(visible){
        return (
            <div>
                <button onClick={()=>{setValue(value+1)}}>+</button>
                <button onClick={()=>{setVisible(false)}}>hide</button>
               {/* <ClassCounter value={value}/>*/}
                {/*<HookCounter value={value}/>*/}
                <Notification/>
            </div>
        )
    }
    else
    {
        return <button onClick={()=>setVisible(true)}>Show</button>
    }
}

const HookCounter=({value})=>{
   useEffect(()=> {
       console.log('mount');
       return () => console.log('unmount');
   },[]);
   useEffect(()=>console.log('update'));

   return <p>{value}</p>
}
class ClassCounter extends Component{
    componentDidMount() {
        console.log('didmount');
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('class update');
    }
    componentWillUnmount() {
        console.log('willunmount');
    }
    render(){
        return(
            <div>{this.props.value}</div>
        )
    }
}

/*const Notification=()=>{

    const [display,setVisible] = useState('block');
    const hidden ={
        display:`${display}`
    }
    useEffect(()=>{
        return ()=>setVisible('block')
    })

    useEffect(()=>setInterval(() => setVisible('none'), 2000));


    return <div style={hidden}>Hello</div>

}*/

const Notification = ()=>{
    const [visible,setVisible] = useState(true);
    useEffect(()=>{
       const timeout =  setTimeout(()=>setVisible(false),2500)
        return ()=>clearTimeout(timeout)
    },[])

    return(
        <div>
            {visible && <p>Hello</p>}
        </div>
    )
}



ReactDOM.render(<App/>,document.getElementById('root'))
