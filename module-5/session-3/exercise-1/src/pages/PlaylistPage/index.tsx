import domainSlice, {DomainState} from "../../slices/DomainSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {AuthenticationState} from "../../slices/AuthenticationSlice.ts";
import {RootState} from "../../slices/Store.ts";
import SpotifyContentService from "../../services/SpotifyContentService.ts";
import {useEffect, useState} from "react";
import Playlist from "../../models/Playlist.ts";
import PlaylistComponent from "../../components/PlaylistComponent";
import {useNavigate} from "react-router-dom";
import CreatePlaylistModalComponent from "../../components/CreatePlaylistModalComponent";
import {useFormik} from "formik";

export default function PlaylistPage() {
    const dispatch = useDispatch()
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const domainState: DomainState = useSelector((state: RootState) => state.domain);
    const spotifyContentService: SpotifyContentService = new SpotifyContentService(authenticationState.accessToken)
    const navigate = useNavigate();

    useEffect(() => {
        spotifyContentService
            .getPlaylistsByUserId(authenticationState.user!.userId!)
            .then((result) => {
                dispatch(domainSlice.actions.setPlaylistDomain({
                    playlists: result.data.items.map((playlist: any) => {
                        return Playlist.constructFromApi(playlist)
                    })
                }))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const handleClickPlaylist = (event: any, playlist: Playlist) => {
        navigate(`/playlists/${playlist.playlistId}`)
    }

    const handleClickPlaylistRemove = (event: any, playlist: Playlist) => {
        event.stopPropagation()
        spotifyContentService
            .unfollowPlaylist(playlist.playlistId!)
            .then(() => {
                dispatch(domainSlice.actions.setPlaylistDomain({
                    playlists: domainState.playlistDomain!.playlists!.filter((item) => item.playlistId !== playlist.playlistId)
                }))
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleClickCreatePlaylist = (event: any) => {
        setIsCreatePlaylistModalOpen(true)
    }

    const createPlaylistModalFormik = useFormik({
        initialValues: {
            name: ""
        },
        onSubmit: (values) => {
            spotifyContentService
                .createPlaylist(authenticationState.user!.userId!, values.name)
                .then((result) => {
                    dispatch(domainSlice.actions.setPlaylistDomain({
                        playlists: domainState.playlistDomain!.playlists!.concat([Playlist.constructFromApi(result.data)])
                    }))
                    setIsCreatePlaylistModalOpen(false)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    })

    const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] = useState(false)
    const handleCreatePlaylistModalClose = () => {
        setIsCreatePlaylistModalOpen(false)
    }

    return (
        <div className="page authenticated playlist">
            <div className="section" id="playlisted-track">
                <div className="title">
                    <h1>Playlists</h1>
                </div>
                <div className="action">
                    <button onClick={handleClickCreatePlaylist}>Create Playlist</button>
                    <CreatePlaylistModalComponent
                        isOpen={isCreatePlaylistModalOpen}
                        onClose={handleCreatePlaylistModalClose}
                        formik={createPlaylistModalFormik}
                    />
                </div>
                <div className="list">
                    {
                        domainState.playlistDomain!.playlists!.length > 0 ?
                            domainState.playlistDomain!.playlists!.map((playlist, index) => {
                                    return (
                                        <PlaylistComponent
                                            data={playlist}
                                            key={index}
                                            onClickPlaylist={(event) => handleClickPlaylist(event, playlist)}
                                            onClickPlaylistRemove={(event) => handleClickPlaylistRemove(event, playlist)}
                                        />
                                    )
                                }
                            )
                            :
                            <div>
                                Please add some playlist..
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

