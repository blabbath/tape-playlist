<template>
    <span>Please login through Spotify</span>
    <a
        :href="
            'https://accounts.spotify.com/authorize?client_id=' +
            clientID +
            '&redirect_uri=' +
            redirectURI +
            '&response_type=token&show_dialog=true'
        "
    >
        Login to Spotify
    </a>
</template>
<script>
import config from '../config/config'

export default {
    data() {
        return {
            clientID: config.clientID,
            redirectURI: config.redirectURI
        }
    }
}
</script>
<style>
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
</style>
