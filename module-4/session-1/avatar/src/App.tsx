import './App.css'
import Avatar from "./components/Avatar.tsx";
import {useState} from "react";

export default function App() {
    const [data, setData] = useState<any>([
        {
            name: 'name0',
            imageUrl: 'https://placehold.co/200',
        },
        {
            name: 'name1',
            imageUrl: 'https://placehold.co/200',
        },
        {
            name: 'name2',
            imageUrl: 'https://placehold.co/200',
        },
    ])

    return (
        <>
            <div style={{display: "flex", flex: "1 1 auto", flexFlow: "row wrap"}}>
                {
                    data.map((item: any) => {
                        return (
                            <Avatar name={item.name} imageUrl={item.imageUrl}/>
                        )
                    })
                }
            </div>

        </>
    )
}

