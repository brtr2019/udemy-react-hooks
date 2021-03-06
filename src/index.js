import React, {Component, useEffect, useState, useCallback,useMemo} from "react";
import ReactDOM from  'react-dom';

const App=()=>{
    const [value,setValue] = useState(1);
    const [visible,setVisible] = useState(true);
    if(visible){
        return (
            <div>
                <button onClick={()=>{setValue(value+1)}}>+</button>
                <button onClick={()=>{setVisible(false)}}>hide</button>
                {/* <ClassCounter value={value}/>*/}
                {/*<HookCounter value={value}/>*/}
                {/*<Notification/>*/}
                <PlanetInfo id={value}/>
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

const getPlanet=(id)=>{
    return fetch(`https://swapi.co/api/planets/${id}/`)
        .then(res=>res.json())
        .then(data=>data);

}

const useRequest=(request)=>{
    const initialState = useMemo(()=>({
        data:null,
        loading:true,
        error:null
    }),[]);
    const [dataState,setDataState] = useState({initialState});

    useEffect(()=>{
        setDataState(initialState);

        let cancelled = false;
        request()
            .then(data=>!cancelled && setDataState({
                data,
                loading:false,
                error:null
            }))
            .catch(error=>!cancelled && setDataState({
                    data: null,
                    loading:false,
                    error
                }
            ))
        return ()=>cancelled=true;
    },[request,initialState])

    return dataState;
}

const usePlanetInfo=(id)=>{
    const request = useCallback(()=>getPlanet(id),[id])
    return useRequest(request);
}
const PlanetInfo=({id})=>{
    const {data,loading,error} = usePlanetInfo(id);
    if(error){
        return <div>Something went wrong </div>
    }
    if(loading){
        return <div>loading...</div>
    }
    return (
        <div>{id} - {data && data.name} </div>
    )
}



ReactDOM.render(<App/>,document.getElementById('root'))
