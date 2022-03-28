<template>
    <div class="login">
        <p cds-text="display" cds-layout="p-t:xxl p-b:xl">Mixtape Recorder</p>
        <div
            spacing-padding
            cds-layout="vertical gap:lg align:horizontal-center"
            class="text-area"
        >
            <AboutText></AboutText>
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
import AboutText from '../components/AboutText.vue'

export default {
    components: { AboutText },
    data() {
        return {
            clientID: import.meta.env.VITE_clientID,
            redirectURI: import.meta.env.VITE_redirectURI,
        }
    },

    computed: {
        token() {
            return this.$store.state.auth.token
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
