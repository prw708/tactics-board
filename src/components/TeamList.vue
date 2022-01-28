<template lang="pug">
div(
  v-if="!this.loadLoading"
  class="col-12 p-4"
)
  div(class="row g-4")
    div(class="col-sm-6")
      h5(class="mb-4") Team 1
      ul(class="list-group")
        li(
          v-if="team1Players.length === 0"
          class="list-unstyled"
        ) No members
        li(
          v-for="player in team1Players"
          :class="(selectedPlayerId === player.id && selectedPlayerTeam === player.team) ? \
                  'list-group-item border-0 px-0 fw-bold' : \
                  'list-group-item border-0 px-0'"
          @click="getSelectedPlayerFromList(player)"
        )
          div(class="row")
            div(class="col-2 col-xl-1")
              span(class="badge text-dark bg-light") {{ player.number }}
            div(class="col-2 col-xl-1")
              span(
                class="border rounded fs-6 ps-4" 
                :style="{ backgroundColor: player.color }"
              )
            div(class="col-8 col-xl-10") {{ player.name }}
    div(class="col-sm-6")
      h5(class="mb-4") Team 2
      ul(class="list-group")
        li(
          v-if="team2Players.length === 0"
          class="list-unstyled"
        ) No members
        li(
          v-for="player in team2Players"
          :class="(selectedPlayerId === player.id && selectedPlayerTeam === player.team) ? \
                  'list-group-item border-0 px-0 fw-bold' : \
                  'list-group-item border-0 px-0'"
          @click="getSelectedPlayerFromList(player)"
        )
          div(class="row")
            div(class="col-2 col-xl-1")
              span(class="badge text-dark bg-light") {{ player.number }}
            div(class="col-2 col-xl-1")
              span(
                class="border rounded fs-6 ps-4" 
                :style="{ backgroundColor: player.color }"
              )
            div(class="col-8 col-xl-10") {{ player.name }}
</template>

<script>
export default {
  props: [
    'selectedPlayer',
    'players',
    'forcePlayerUpdate',
    'loadLoading',
  ],
  emits: [
    'update:selectedPlayer',
    'update:players',
    'update:forcePlayerUpdate',
  ],
  data() {
    return {
      team1Players: [],
      team2Players: [],
      selectedPlayerId: -1,
      selectedPlayerTeam: '',
    }
  },
  watch: {
    selectedPlayer(val) {
      if (val !== -1) {
        this.selectedPlayerId = this.players[this.players.length - 1].id;
        this.selectedPlayerTeam = this.players[this.players.length - 1].team;
      } else {
        this.selectedPlayerId = -1;
        this.selectedPlayerTeam = '';
      }
    },
    forcePlayerUpdate(val) {
      if (val) {
        this.team1Players = [];
        this.team2Players = [];
        for (var i = 0; i < this.players.length; i++) {
          if (this.players[i].team === '1') {
            this.team1Players.push(this.players[i]);
          } else if (this.players[i].team === '2') {
            this.team2Players.push(this.players[i]);
          }  
        }
        this.team1Players.sort(function(first, second) {
          if (parseInt(first.number, 10) > parseInt(second.number, 10)) {
            return 1;
          } else if (parseInt(first.number, 10) <= parseInt(second.number, 10)) {
            return -1;
          }
        });
        this.team2Players.sort(function(first, second) {
          if (parseInt(first.number, 10) > parseInt(second.number, 10)) {
            return 1;
          } else if (parseInt(first.number, 10) <= parseInt(second.number, 10)) {
            return -1;
          }
        });
      }
    },
  },
  methods: {
    getSelectedPlayerFromList(player) {
      for (var i = 0; i < this.players.length; i++) {
        if (this.players[i].id === player.id) {
          var playersCopy = this.players;
          playersCopy.splice(i, 1);
          playersCopy.push(player);
          this.$emit('update:selectedPlayer', i);
          this.$emit('update:players', playersCopy);
          this.$emit('update:forcePlayerUpdate', true);
          this.selectedPlayerId = player.id;
          this.$nextTick(function() {
            this.$emit('update:selectedPlayer', this.players.length - 1);
          });
          return player;
        }
      }
      this.$emit('update:selectedPlayer', -1);
    },
  },
}
</script>
