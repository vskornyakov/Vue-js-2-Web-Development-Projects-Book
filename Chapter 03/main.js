new Vue({
    name: 'game',
    el: '#app',
    data: state,
    template: `<div id="#app">
        <top-bar
            :turn="turn"
            :current-player-index="currentPlayerIndex"
            :players="players"
        />
        <transition name="hand">
            <hand v-if="!activeOverlay"
            :cards="testHand"
            @card-play="testPlayCard"
        />
        </transition>
    </div>`,
    computed: {
        testCard() {
            return cards.archers;
        }
    },
    created() {
        this.testHand = this.createTestHand();
    },
    methods: {
        handlePlay() {
            console.log('You played a card!');
        },
        createTestHand() {
            const cards = [];
            const ids = Object.keys(cards);

            for (let i = 0; i < 5; i++) {
                cards.push(this.testDrawCard());
            }

            return cards;
        },
        testDrawCard() {
            const ids = Object.keys(cards);
            const randomId = ids[Math.floor(Math.random() * ids.length)];

            return {
                uid: cardUid++,
                id: randomId,
                def: cards[randomId]
            };
        },
        testPlayCard(card) {
            // remove played card from palyer hand
            const idx = this.testHand.indexOf(card);
            this.testHand.splice(idx, 1);
        }
    }
});

window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio();
});
