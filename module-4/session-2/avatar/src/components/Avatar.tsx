import {Avatar} from "../App.tsx";

type AvatarProps = {
    data: Avatar
}

export default function Avatar(props: AvatarProps) {
    const data: Avatar = props.data;

    const conditionStyle = (): any => {
        const style: any = {
            display: "flex",
            flex: "1",
            fontWeight: "bold",
            fontSize: "200%"
        }
        if (data.gender === "male"){
            style.color = "blue"
        } else {
            style.color = "lightcoral"
        }
        return style
    }

    return (
        <>
            <div style={{
                display: "flex",
                flex: "1",
                flexFlow: "column wrap"
            }}>
                <h1 style={conditionStyle()}>
                    {data.name}
                </h1>
                <div style={{
                    display: "flex",
                    flex: "1"
                }}>
                    <img style={{borderRadius: "100%"}} src={data.imageUrl} alt="image"/>
                </div>
            </div>
        </>
    )
}
