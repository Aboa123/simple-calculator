import './App.css';
import {useState,useEffect} from 'react';

function App() {
    const btn = ['0','1','2','3','4','5','6','7','8','9','.','%'];
    const optionBtn = ['+','-','*','/'];
    const [data,setData] = useState("");
    
    const dataChange = (item,type) => {
        try {
            if(type === "clear")
            {
                setData("")
            }
            if(type === "slice")
            {
                setData(data.slice(0,data.length-1))
            }
            if(type === "num")
            {
                setData(data+item)
            }
            if(type === "option")
            {
                if(data.length > 0)
                {
                    if(Number(data.charAt(data.length-1)))
                    {
                        setData(data+item,"option")
                    }
                    else if(!Number(data.charAt(data.length-1)) && data.charAt(data.length-1) != item)
                    {
                        setData(data.slice(0,data.length-1)+item)
                    }
                }
            }
            if(type === "answer")
            {
                if(data.length > 0)
                setData(eval(data))
            }
        } catch(e) {
            alert("There's a problem with your calculation.")
        }
    }

    const dataTyping = (e) => {
        try {
            if(e.key === "Escape")
            {
                setData("")
            }
            if(btn.includes(e.key))
            {
                setData(data+e.key)
            }
            if(optionBtn.includes(e.key))
            {
                if(data.length > 0)
                {
                    if(Number(data.charAt(data.length-1)))
                    {
                        setData(data+e.key,"option")
                    }
                    else if(!Number(data.charAt(data.length-1)) && data.charAt(data.length-1) != e.key)
                    {
                        setData(data.slice(0,data.length-1)+e.key)
                    }
                }
            }
            if(e.key === "Backspace")
            {
                setData(data.slice(0,data.length-1))
            }
            if(e.key === "Enter")
            {
                if(data.length > 0)
                setData(String(eval(data)))
            }
        } catch(e) {
            alert("There's a problem with your calculation.")
        }
    }

    useEffect(() => {
        window.addEventListener("keydown",dataTyping);
        return () => window.removeEventListener("keydown",dataTyping);
    })

    return (
        <div className="App">
            <div style={{width:400}}>
                <div className="answer">{data}</div>
                <div className="btn-group">
                    <div>
                    <button className="btn-option" onClick={()=>dataChange(null,"clear")}>Clear</button>
                    <button className="btn-option" onClick={()=>dataChange(null,"slice")}>←</button>
                    </div>
                    {btn.map(item => 
                        <button className="btns" onClick={()=>dataChange(item,"num")}>{item}</button>
                    )}
                </div>
                <div className="btn-side-option">
                    {optionBtn.map(item => 
                        <button className="option-btns" onClick={()=>dataChange(item,"option")}>{item}
                        </button>
                    )}
                    <button className="option-btns" onClick={()=>dataChange(null,"answer")}>=</button>
                </div>
            </div>
        </div>
    );
}

export default App;
