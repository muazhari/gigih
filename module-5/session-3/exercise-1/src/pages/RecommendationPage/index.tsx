import TrackComponent from "../../components/TrackComponent";
import {useDispatch, useSelector} from "react-redux";
import {AuthenticationState} from "../../slices/AuthenticationSlice.ts";
import {RootState} from "../../slices/Store.ts";
import domainSlice, {DomainState} from "../../slices/DomainSlice.ts";
import SpotifyContentService from "../../services/SpotifyContentService.ts";
import {useEffect, useState} from "react";
import Track from "../../models/Track.ts";

export default function RecommendationPage() {
    const dispatch = useDispatch()
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const domainState: DomainState = useSelector((state: RootState) => state.domain);
    const spotifyContentService: SpotifyContentService = new SpotifyContentService(authenticationState.accessToken)

    useEffect(() => {
        spotifyContentService
            .getPlaylistsByUserId(authenticationState.user!.userId!)
            .then((result) => {
                return Promise.all(result.data.items.map((playlist: any) => {
                    return spotifyContentService.getPlaylistTracks(playlist.id)
                }))
            })
            .then((playlistsTracks) => {
                return playlistsTracks.flatMap((playlistTrack) => playlistTrack.data.items.map((item: any) => item.track))
            })
            .then((tracks) => {
                const trackIds = tracks.map((track: any) => track.id)
                const artistIds = tracks.flatMap((track: any) => track.artists.map((artist: any) => artist.id))
                const uniqueTrackIds = [...new Set(trackIds)]
                const uniqueArtistIds = [...new Set(artistIds)]
                return spotifyContentService
                    .getRecommendations(
                        uniqueTrackIds.slice(0, 2),
                        uniqueArtistIds.slice(0, 2),
                    )
            })
            .then((recommendationTracks) => {
                dispatch(domainSlice.actions.setRecommendationDomain({
                    tracks: recommendationTracks.data.tracks.map((track: any) => {
                        return Track.constructFromApi(track)
                    }),
                }))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const handleClickTrack = (event: any, track: Track) => {

    }

    const [audio, setAudio] = useState<HTMLAudioElement>();

    const handleClickTrackPreview = (event: any, track: Track) => {
        if (!audio) {
            const audio = new Audio(track.previewUrl);
            audio.play().then(() => {
                setAudio(audio);
            })
        }
        else {
            audio.pause();
            setAudio(undefined);
        }
    }

    const handleClickTrackAddToPlaylist = (event: any, track: Track) => {

    }

    return (
        <div className="page authenticated recommendation">
            <div className="section" id="recommendation-track">
                <div className="title">
                    <h1>Recommendation Tracks</h1>
                </div>
                <div className="list">
                    {
                        domainState.recommendationDomain!.tracks!.length > 0 ?
                            domainState.recommendationDomain!.tracks!.map((track, index) => {
                                    return (
                                        <TrackComponent
                                            data={track}
                                            key={track.trackId}
                                            handleClickTrack={(event) => handleClickTrack(event, track)}
                                            handleClickTrackPreview={(event) => handleClickTrackPreview(event, track)}
                                            handleClickTrackAddToPlaylist={(event) => handleClickTrackAddToPlaylist(event, track)}
                                        />
                                    )
                                }
                            )
                            :
                            <div>
                                Empty..
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

