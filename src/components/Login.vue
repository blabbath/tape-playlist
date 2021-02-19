<template>
    <div class="login">
        <p cds-text="display" cds-layout="p-t:xxl p-b:xl">Mixtape Recorder</p>
        <div
            spacing-padding
            cds-layout="vertical gap:lg align:horizontal-center"
            class="text-area"
        >
            <p cds-text="message justify">
                The Mixtape Recorder lets you create Spotify Playlist, in a
                format a classic C90 cassette tape would demand.
            </p>

            <p cds-text="message justify">
                We believe that limitation leads to inspiration and dedication,
                so go ahaed and create a tape with 2 times 45 minutes for your
                next run, best friend, this special mood or very special person!
            </p>
            <p cds-text="message justify">
                To search for tracks and save Mixtapes to your Premium Accounts
                we use the Spotify API endpoints.
            </p>
            <a
                class="btn"
                :href="`https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes.join(
                    '%20'
                )}&response_type=token&show_dialog=true`"
                cds-layout="m-t:lg"
                cds-text="section"
            >
                Login via Spotify
                <img
                    cds-layout="m-l:md"
                    src="../../public/Spotify_Icon_RGB_White.png"
                    alt=""
                    height="32"
                    width="32"
                />
            </a>
        </div>
    </div>
</template>
<script>
import config from '../config/config'

export default {
    data() {
        return {
            clientID: config.clientID,
            redirectURI: config.redirectURI,
            scopes: config.scopes,
        }
    },
}
</script>
<style scoped>
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.text-area {
    width: 40%;
}

.btn {
    background-color: black;
    color: white;
    text-decoration: none;
    padding: 18px 32px 18px 36px;
    border-radius: 500px;
    text-transform: uppercase;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
}
</style>
>
