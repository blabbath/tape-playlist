<template>
    <div class="login">
        <p cds-text="display" cds-layout="p-t:xxl p-b:xl">Mixtape Recorder</p>
        <div
            spacing-padding
            cds-layout="vertical gap:lg align:horizontal-center"
            class="text-area"
        >
            <p cds-text="message justify" cds-layout="p-t:lg">
                The Mixtape Recorder lets you create Spotify Playlist, in a
                format a classic C90 cassette tape would demand. C90 stands for
                a total of 90 minutes, so you have two times 45 minutes to
                create your reminescence of a once beloved culture on the verge
                of oblivion.
            </p>

            <p cds-text="message justify">
                We believe that limitation leads to inspiration and dedication,
                so go ahaed and create a mixtape for your next run, best friend,
                this special mood or very special person!
            </p>
            <p cds-text="message justify">
                To search for tracks and save Mixtapes to your Premium Accounts
                we use the Spotify API endpoints. This application cannot be
                used withaout a Spotify Premium Account.
            </p>
            <a
                class="btn"
                :href="
                    'https://accounts.spotify.com/authorize?client_id=' +
                    clientID +
                    '&redirect_uri=' +
                    redirectURI +
                    '&response_type=token&show_dialog=true&scope=playlist-modify-private'
                "
                cds-layout="m-t:xl"
                cds-text="section"
                v-if="!token"
            >
                Login via Spotify
                <img
                    cds-layout="m-l:md"
                    src="/Spotify_Icon_RGB_White.png"
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
        }
    },
    computed: {
        token() {
            return this.$store.state.token
        },
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
    font-weight: 300;
    display: inline-flex;
    align-items: center;
}
</style>
>
