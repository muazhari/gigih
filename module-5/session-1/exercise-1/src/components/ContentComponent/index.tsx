import "./index.css"
import {forwardRef, useEffect, useState} from "react";
import SongComponent from "../SongComponent";
import {useDispatch, useSelector} from "react-redux";
import {AuthenticationState} from "../../slices/AuthenticationSlice.ts";
import {RootState} from "../../slices/Store.ts";
import {useFormik} from "formik";
import SpotifyContentService from "../../services/SpotifyContentService.ts";

export default function ContentComponent() {
    const dispatch = useDispatch()
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const spotifyContentService: SpotifyContentService = new SpotifyContentService(authenticationState.accessToken)

    const searchFormik = useFormik({
        initialValues: {
            value: ""
        },
        onSubmit: (values) => {
            handleSubmitSearch(values.value)
        },
    })

    const handleSubmitSearch = (value: string) => {
        spotifyContentService
            .search(value)
            .then((result) => {
                setTrackItems(result.data.tracks.items)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const [trackItems, setTrackItems] = useState([])

    useEffect(() => {
        handleSubmitSearch(searchFormik.values.value)
    }, [searchFormik.values.value])

    return (
        <div className="content">
            <div className="section" id="search">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search"
                        id="search-input"
                        name="value"
                        onBlur={searchFormik.handleBlur}
                        onChange={searchFormik.handleChange}
                    />
                </div>
            </div>

            <div className="section" id="all-song">
                <div className="title">
                    <h1>All Song</h1>
                </div>
                <div className="song-list">
                    {
                        trackItems.length > 0 ?
                            trackItems.map((item: any) => {
                                return {
                                    songName: item.name,
                                    artistName: item.artists[0].name,
                                    songUrl: item.uri,
                                    imageUrl: item.album.images[0].url
                                }
                            }).map((song, index) => {
                                return (
                                    <SongComponent data={song} key={index}/>
                                )
                            })
                            :
                            <div>
                                Please use the search bar..
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

