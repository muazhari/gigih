import "./index.css"

type SongComponentProps = {
    data: {
        songName: string,
        artistName: string
    }
}

export default function SongComponent(props: SongComponentProps) {
    const {data} = props;

    return (
        <div className="song">
            <div className="song-image">
                <img src="https://placehold.co/200" alt="song-image"/>
            </div>
            <div className="song-info">
                <h3>{data.songName}</h3>
                <p>{data.artistName}</p>
            </div>
        </div>
    )
}
