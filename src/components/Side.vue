<template>
    <div class="side-container-inner">
        <p class="side">{{ title }}</p>
        <app-alert :alert="alert"></app-alert>
        <transition-group tag="table" name="table">
            <tr
                v-for="(track, index) in tracks"
                :key="track"
                cds-text="message"
            >
                <td>
                    <div
                        class="icon"
                        @click="removeTrack(index, sideIdentifier)"
                    >
                        <cds-icon
                            shape="minus-circle"
                            status="danger"
                            size="22"
                        ></cds-icon>
                    </div>
                </td>
                <td>
                    {{ index + 1 }}
                </td>
                <td>{{ track.artist }} - {{ track.track }}</td>
                <td>
                    {{ track.duration_mmss }}
                </td>
                <td>
                    <div class="icon">
                        <cds-icon
                            class="move-icon"
                            shape="angle"
                            size="22"
                            @click="moveTrackUp(index, sideIdentifier)"
                        ></cds-icon>
                        <cds-icon
                            class="move-icon"
                            shape="angle"
                            size="22"
                            flip="vertical"
                            @click="moveTrackDown(index, sideIdentifier)"
                        ></cds-icon>
                    </div>
                </td>
            </tr>
        </transition-group>
    </div>
</template>
<script>
import AppAlert from './Alert.vue'
export default {
    components: { AppAlert },
    props: ['alert', 'title', 'tracks', 'sideIdentifier'],
    methods: {
        removeTrack: function (index, side) {
            let obj = {
                index,
                side,
            }
            this.$store.commit('removeTrack', obj)
        },

        moveTrackUp: function (index, side) {
            let obj = {
                index,
                side,
            }
            this.$store.commit('moveTrackUp', obj)
        },

        moveTrackDown: function (index, side) {
            let obj = {
                index,
                side,
            }
            this.$store.commit('moveTrackDown', obj)
        },
    },
}
</script>
<style scoped>
.side {
    position: relative;
    margin: 0;
    padding: 0 2rem 0.5rem;
    border-bottom: 1px solid #666666;
}

table {
    border-collapse: collapse;
}

tr td {
    border-bottom: 1px dotted #666666;
}

td {
    border-spacing: 0;
    padding: 0.5rem 0.5rem;
}

cds-alert-group {
    margin-left: 0.75rem;
    width: 60%;
    margin: 0.5rem;
}

.icon {
    display: flex;
    flex-direction: column;
    cursor: pointer;
}

.move-icon {
    --color: #666666;
}

.side-container-inner {
    padding: 1rem;
}

.table-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.table-enter-to {
    opacity: 1;
    transform: scale(1);
}

.table-enter-active {
    transition: all 0.33s ease;
}

.table-leave-from {
    opacity: 1;
    transform: scale(1);
}
.table-leave-to {
    opacity: 0;
    transform: scale(0.8);
}
.table-leave-active {
    transition: all 0.33s ease;
}

.table-move {
    transition: transform 0.66s;
}
</style>
