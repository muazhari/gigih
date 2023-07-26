import './App.css'
import Avatar from "./components/Avatar.tsx";
import {useEffect, useState} from "react";

export type Avatar = {
    id: string,
    name: string,
    gender: string,
    imageUrl: string
}

export default function App() {
    const [data, setData] = useState<Avatar[]>([])

    useEffect(() => {
        const data: Avatar[] = []
        for (let i = 0; i < 50; i++) {
            data.push({
                id: i.toString(),
                name: "name " + i,
                gender: i % 2 === 0 ? "male" : "female",
                imageUrl: "https://placehold.co/200"
            })
        }
        setData(data)
    }, [])

    const [number, setNumber] = useState<number>(0)
    const changeProblemOne = (numberFromArgument: number): void => {
        // kenapa state numbernya tidak langsung keupdate?
        setNumber(numberFromArgument)
        const numberFromState: number = number
        const result: number = numberFromState + numberFromState
        alert(result)
    }

    const [count, setCount] = useState<number>(0)
    const changeProblemTwo = (numberFromArgument: number): void => {
        // kenapa callback setNumbernya kadang tereksekusi 2x?
        setNumber((prevNumber: number) => {
            setCount((prevCount: number) => prevCount + 1)
            alert(JSON.stringify({
                prevNumber: prevNumber,
                numberFromArgument: numberFromArgument
            }))
            return prevNumber + numberFromArgument
        })
    }

    return (
        <>
            <button onClick={() => changeProblemOne(1)}>Click me</button>
            <button onClick={() => changeProblemTwo(1)}>Click me</button>
            <div style={{
                display: "flex",
                flex: "1 1 auto",
                flexFlow: "row wrap"
            }}>
                {
                    data.map((item: Avatar) => {
                        return (
                            <Avatar data={item}/>
                        )
                    })
                }
            </div>
        </>
    )
}

