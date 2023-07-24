export default function Avatar(props: any) {
    return (
        <>
            <div style={{display: "flex", flex: "1", flexFlow: "column wrap"}}>
                <div style={{ display: "flex", flex: "1", fontWeight: "bold", fontSize: "200%"}}>{props.name}</div>
                <div style={{  display: "flex", flex: "1"}}>
                    <img style={{borderRadius: "100%"}} src={props.imageUrl} alt="image"/>
                </div>
            </div>
        </>
    )
}
