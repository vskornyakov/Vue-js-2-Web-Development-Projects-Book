// top-bar
Vue.component('top-bar', {
    props: ['players', 'currentPlayerIndex', 'turn'],
    template: `<div class="top-bar" :class="'player-' + currentPlayerIndex">
        <div class="player p0">{{ players[0].name }}</div>
        <div class="turn-counter">
            <img class="arrow" src="svg/turn.svg" />
            <div class="turn">Turn {{ turn }}</div>
        </div>
        <div class="player p1">{{ players[1].name }}</div>
    </div>`
});

// card
Vue.component('card', {
    template: `<div class="card" :class="'type-' + def.type" @click="play">
        <div class="title">{{ def.title }}</div>
        <img class="separator" src="svg/card-separator.svg" />
        <div class="description"><div v-html="def.description"></div></div>
        <div class="note" v-if="def.note"><div v-html="def.note"></div></div>
    </div>`,
    props: ['def'],
    methods: {
        play() {
            this.$emit('play');
        }
    }
});

// hand
Vue.component('hand', {
    template: `<div class='hand'>
        <div class='wrapper'>
        <!-- Cards -->
            <transition-group name="card" tag="div" class="cards">
                <card v-for="card of cards" :def="card.def" :key="caard.uid"
                @play="handlePlay(card) />
            </transition-group>
            </div>
    </div>`,
    props: ['cards'],
    methods: {
        handlePlay() {
            this.$emit('card-play', card);
        }
    }
});
