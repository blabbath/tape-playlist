<template>
    <div class="search-container">
        <div class="search-input">
            <input
                type="search"
                v-model="searchInput"
                @keyup="searchSpotifyAPI"
                placeholder="Search for a track"
                cds-text="section"
            />
            <cds-icon
                class="clear-btn"
                @click="clearSearch"
                shape="times"
                size="26"
            ></cds-icon>
        </div>

        <div class="search-output" v-if="searchInput">
            <div
                v-for="result of searchResult"
                :key="result"
                class="search-result"
                cds-text="message"
            >
                <div class="plus-icon" @click="addTrackToStore(result)">
                    <cds-icon
                        shape="plus-circle"
                        status="success"
                        size="22"
                    ></cds-icon>
                </div>
                {{ result.artist }} - {{ result.track }} ({{
                    result.duration_mmss
                }})
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    props: ['token'],
    data() {
        return {
            searchInput: '',
            searchResult: [],
            mixName: '',
        }
    },
    methods: {
        clearSearch: function () {
            this.searchInput = ''
        },

        searchSpotifyAPI: function () {
            if (this.token && this.searchInput) {
                axios
                    .get(
                        `https://api.spotify.com/v1/search?q=${this.searchInput}&type=track&limit=3&access_token=${this.token}`
                    )
                    .then((response) => {
                        this.returnAPIresults(response)
                    })
            } else if (this.searchInput.length === 0) {
                this.searchResult.length = 0
            }
        },

        msToMinuteSecond: function (ms) {
            let seconds = ms / 1000
            seconds = seconds % 3600
            let minutes = parseInt(seconds / 60)
            seconds = Math.round(seconds % 60)
            return minutes + ':' + this.padSeconds(seconds)
        },

        padSeconds: function (num) {
            num = num.toString()
            while (num.length === 1) num = '0' + num
            return num
        },

        returnAPIresults: function (response) {
            this.searchResult.length = 0
            response.data.tracks.items.forEach((item) => {
                let obj = {}
                obj.track = item.name
                obj.album = item.album.name
                obj.artist = item.artists[0].name
                obj.duration_ms = item.duration_ms
                obj.duration_mmss = this.msToMinuteSecond(item.duration_ms)
                obj.id = item.id
                this.searchResult.push(obj)
            })
        },

        addTrackToStore: function (result) {
            this.$store.commit('addTrack', result)
        },
    },
}
</script>
<style scoped>
.search-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0rem;
}

.search-input {
    display: flex;
    align-items: center;
}

input[type='search'],
input[type='text'] {
    width: 15rem;
    height: 3rem;
    padding-left: 0.6rem;
    padding-right: 2.5rem;
    border: 1px solid #666666;
    border-radius: 3px;
    background-color: white;
    margin: 0.5rem 0;
}

input:focus {
    background-color: white;
    outline-color: black;
}

input[type='search']::-webkit-search-cancel-button {
    display: none;
}

.clear-btn {
    position: absolute;
    transform: translate(1000%, 0%);
    cursor: pointer;
}

.search-output {
    position: absolute;
    display: flex;
    z-index: 100;
    flex-direction: column;
    align-items: center;
    min-height: 8rem;
    background-color: white;
    top: 4rem;
    border: 1px solid #666666;
    border-radius: 3px;
    padding: 1rem;
}

.search-result {
    max-width: 100%;
    padding: 0.5rem 0;
    display: inline-flex;
    align-items: flex-start;
    line-height: 1.5rem;
}

.plus-icon cds-icon {
    margin: 0 0.5rem;
    cursor: pointer;
}
</style>
