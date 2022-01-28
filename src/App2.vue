<template lang="pug">
div(
  v-if="this.loading"
  class="h-100 d-flex align-items-center justify-content-center"
)
  div(
    class="spinner-border"
    role="status"
  )
    span(class="visually-hidden") Loading...
Preview(
  :selectedField="selectedField" 
  v-model:selectedMode="selectedMode" 
  v-model:selectedPlayer="selectedPlayer" 
  v-model:players="players" 
  @createPlayer="createPlayer" 
  @deletePlayer="deletePlayer" 
  @editPlayerPath="editPlayerPath" 
  @resetPlayerPath="resetPlayerPath" 
  @setPositions="setPositions"
  @resetPositions="resetPositions"
  @updateDimensions="updateDimensions" 
  v-model:forcePlayerUpdate="forcePlayerUpdate"
  :loading="loading"
)
</template>

<script>
import Preview from './components/Preview.vue';

export default {
  name: 'App',
  components: {
    Preview: Preview,
  },
  emits: [],
  props: ['loadedData', 'viewOnly', 'loading'],
  data() {
    return {
      selectedField: 'Soccer',
      selectedMode: '',
      selectedPlayer: -1,
      players: [],
      PlayerFormValues: { team: '1', color: '#ffffff', number: '', name: '' },
      TitleFormValues: { title: '', public: false },
      PathFormValues: [],
      forcePlayerUpdate: false,
      playerError: '',
      uniqueIndex: 0,
      title: '',
      public: false,
      dimensions: {},
      validate: false,
      valid: { title: false, players: false, paths: false },
    }
  },
  computed: {
    maxPlayers() {
      if (this.selectedField === 'Soccer') {
        return 11;
      } else if (this.selectedField === 'Basketball') {
        return 5;
      } else if (this.selectedField === 'American Football') {
        return 11;
      }
      return 99;
    },
    ballColor() {
      if (this.selectedField === 'Soccer') {
        return '#ffffff';
      } else if (this.selectedField === 'Basketball') {
        return '#d96200';
      } else if (this.selectedField === 'American Football') {
        return '#a85d00';
      }
      return '#ffffff';
    },
  },
  watch: {
    loadedData(val) {
      this.title = val.title;
      this.public = val.public;
      this.players = val.players;
      this.selectedField = val.field;
      this.TitleFormValues.title = val.title;
      this.TitleFormValues.public = val.public;
      this.forcePlayerUpdate = true;
    },
    selectedField() {
      this.playerError = '';
      for (var i = 0; i < this.players.length; i++) {
        if (this.players[i].team === 'Ball') {
          this.players[i].color = this.ballColor;
          break;
        }
      }
      if (this.PlayerFormValues.team === 'Ball') {
        this.PlayerFormValues.color = this.ballColor;
      }
      if (this.getTeamMemberCount() > this.maxPlayers) {
        this.playerError = 'TEAMMAXPLAYERS';
      }
    },
    selectedMode(val) {
      this.playerError = '';
      if (val === 'Insert') {
        this.PlayerFormValues.team = '1';
        this.PlayerFormValues.color = '#ffffff';
        this.PlayerFormValues.number = this.getSpareNumber('1');
        this.PlayerFormValues.name = 'Player';
      } else if (val === '' || val === 'Delete' || val === 'Reset') {
        this.PlayerFormValues.team = '1';
        this.PlayerFormValues.color = '#ffffff';
        this.PlayerFormValues.number = '';
        this.PlayerFormValues.name = '';
        this.selectedPlayer = -1;
      }
      this.forcePlayerUpdate = true;
    },
    selectedPlayer(val) {
      this.playerError = '';
      if (val !== -1 && this.players.length > 0) {
        this.PlayerFormValues.team = this.players[this.players.length - 1].team;
        this.PlayerFormValues.color = this.players[this.players.length - 1].color;
        this.PlayerFormValues.number = this.players[this.players.length - 1].number;
        this.PlayerFormValues.name = this.players[this.players.length - 1].name;
      }
    },
  },
  methods: {
    validTitle(validity) {
      this.valid.title = validity;
    },
    validPlayers(validity) {
      this.valid.players = validity;
    },
    validPaths(validity) {
      this.valid.paths = validity;
    },
    getTitleFormValueUpdates(val) {
      if (!val.titleError) {
        this.title = val.title;
      }
      if (!val.publicError) {
        this.public = val.public;
      }
      this.TitleFormValues.title = val.title;
      this.TitleFormValues.public = val.public;
    },
    getPlayerFormValueUpdates(val) {
      this.playerError = '';
      if (val.teamChange && (val.team === 'Ball')) {
        this.PlayerFormValues.team = val.team;
        this.PlayerFormValues.color = this.ballColor;
        this.PlayerFormValues.number = '';
        this.PlayerFormValues.name = '';
        if (this.selectedPlayer !== -1 && 
            this.getTeamMemberCount() > 1 &&
            this.players[this.players.length - 1].team !== val.team) {
          this.playerError = 'TEAMMAXPLAYERS';
        } else {
          if (this.selectedPlayer !== -1) {
            if (this.getTeamMemberCount() > 1) {
              this.playerError = 'TEAMMAXPLAYERS';
            } else {
              if (!val.teamsError) {
                this.players[this.players.length - 1].team = this.PlayerFormValues.team;
              }
              if (!val.colorError) {
                this.players[this.players.length - 1].color = this.PlayerFormValues.color;
              }
              if (!val.numberError) {
                this.players[this.players.length - 1].number = this.PlayerFormValues.number;
              }
              if (!val.nameError) {
                this.players[this.players.length - 1].name = this.PlayerFormValues.name;
              }
              this.forcePlayerUpdate = true;
            }
          }
        }
      } else if (val.teamChange && (val.team === '1' || val.team === '2')) {
        this.PlayerFormValues.team = val.team;
        this.PlayerFormValues.color = val.color;
        if (this.selectedPlayer !== -1 && val.number !== '') {
          this.PlayerFormValues.number = val.number;
        } else {
          this.PlayerFormValues.number = this.getSpareNumber(val.team);
        }
        if (val.name !== '') {
          this.PlayerFormValues.name = val.name;
        } else {
          this.PlayerFormValues.name = 'Player';
        }
        if (this.selectedPlayer !== -1 && 
            this.getTeamMemberCount() + 1 > this.maxPlayers &&
            this.players[this.players.length - 1].team !== val.team) {
          this.playerError = 'TEAMMAXPLAYERS';
        } else if (val.number !== '' && !this.checkIfSpareNumber(val.team, val.number)) {
          if (this.selectedPlayer !== -1 && this.players[this.players.length - 1].team !== val.team) {
            this.playerError = 'DUPLICATENUMBER';
          }
        } else {
          if (this.selectedPlayer !== -1) {
            if (this.getTeamMemberCount() + 1 > this.maxPlayers) {
              this.playerError = 'TEAMMAXPLAYERS';
            } else {
              if (!val.teamsError) {
                this.players[this.players.length - 1].team = this.PlayerFormValues.team;
              }
              if (!val.colorError) {
                this.players[this.players.length - 1].color = this.PlayerFormValues.color;
              }
              if (!val.numberError) {
                this.players[this.players.length - 1].number = this.PlayerFormValues.number;
              }
              if (!val.nameError) {
                this.players[this.players.length - 1].name = this.PlayerFormValues.name;
              }
              this.forcePlayerUpdate = true;
            }
          }
        }
        this.PlayerFormValues.teamChange = false;
      } else if (this.selectedPlayer !== -1) {
        this.PlayerFormValues.team = val.team;
        this.PlayerFormValues.color = val.color;
        this.PlayerFormValues.number = val.number;
        this.PlayerFormValues.name = val.name;
        if (val.team === 'Ball') {
          if (this.getTeamMemberCount() > 1) {
            this.playerError = 'TEAMMAXPLAYERS';
          } else {
            if (!val.teamsError) {
              this.players[this.players.length - 1].team = val.team;
            }
            if (!val.colorError) {
              this.players[this.players.length - 1].color = val.color;
            }
            this.forcePlayerUpdate = true;
          }
        } else if (this.getTeamMemberCount() + 1 > this.maxPlayers &&
            this.players[this.players.length - 1].team !== val.team) {
          this.playerError = 'TEAMMAXPLAYERS';
        } else if (val.number !== '' && 
                   !this.checkIfSpareNumber(val.team, val.number) && 
                   this.players[this.players.length - 1].number !== val.number) {
          this.playerError = 'DUPLICATENUMBER';
        } else {
          if (!val.teamsError) {
            this.players[this.players.length - 1].team = val.team;
          }
          if (!val.colorError) {
            this.players[this.players.length - 1].color = val.color;
          }
          if (!val.numberError && this.checkIfSpareNumber(val.team, val.number)) {
            this.players[this.players.length - 1].number = val.number;
          }
          if (!val.nameError) {
            this.players[this.players.length - 1].name = val.name;
          }
          this.forcePlayerUpdate = true;
        }
      } else {
        this.PlayerFormValues = val;
      }
    },
    getPathFormValueUpdates(val) {
      var speeds = new Array(val.length);
      for (var i = 0; i < val.length; i++) {
        var speed, wait;
        if (!val[i].speedError) {
          if (val[i].speed === '') {
            speed = 0;
          } else {
            speed = parseFloat(val[i].speed) * (1609.34) * (1 / 3600);
          }
        } else {
          speed = 0;
        }
        if (!val[i].waitError) {
          if (val[i].wait === '') {
            wait = 0;
          } else {
            wait = parseFloat(val[i].wait) * (1000);
          }
        } else {
          wait = 0;
        }
        speeds[i] = { val: speed, wait: wait };
        this.PathFormValues[i] = { speed: val[i].speed, wait: val[i].wait };
      }
      this.players[this.players.length - 1].speed = speeds;
    },
    createPlayer(coords) {
      var number;
      if (this.checkIfSpareNumber(this.PlayerFormValues.team, this.PlayerFormValues.number)) {
        number = this.PlayerFormValues.number;
      } else {
        number = this.getSpareNumber(this.PlayerFormValues.team);
      }
      if (this.PlayerFormValues.team === 'Ball' && 
          this.getTeamMemberCount() < 1) {
        var ball = this.getPlayer(
          this.PlayerFormValues.team,
          this.ballColor,
          '',
          '',
          [coords],
          null,
        );
        this.players.push(ball);
      } else if (this.PlayerFormValues.team !== 'Ball' && 
                 this.getTeamMemberCount() + 1 <= this.maxPlayers) {
        var player = this.getPlayer(
          this.PlayerFormValues.team,
          this.PlayerFormValues.color,
          number,
          this.PlayerFormValues.name,
          [coords],
          null,
        );
        this.players.push(player);
        this.PlayerFormValues.number = this.getSpareNumber(player.team);
      } else {
        this.playerError = 'TEAMMAXPLAYERS';
      }
    },
    deletePlayer() {
      this.players.pop();
      this.selectedPlayer = -1;
    },
    editPlayerPath(coords) {
      this.players[this.players.length - 1].path.push(coords);
      this.players[this.players.length - 1].speed.push({ val: 2.68224, wait: 0 });
      this.PathFormValues.push({ speed: '6', wait: '' });
    },
    resetPlayerPath() {
      this.players[this.players.length - 1].path = [this.players[this.players.length - 1].path[0]];
      this.players[this.players.length - 1].speed = [{ val: 2.68224, wait: 0 }];
      this.PathFormValues = [];
      this.selectedPlayer = -1;
    },
    setPositions(index, current) {
      if (index >= 0 && index < this.players.length && current) {
        this.players[index].current.step = current.step;
        this.players[index].current.position = current.position;
        this.players[index].current.wait = current.wait;
      }
    },
    resetPositions() {
      for (var i = 0; i < this.players.length; i++) {
        this.players[i].current.step = 0;
        this.players[i].current.position = this.players[i].path[0];
        this.players[i].current.wait = 0;
      }
    },
    updateDimensions(data) {
      this.dimensions.width = data.width;
      this.dimensions.height = data.height;
      this.dimensions.orientation = data.orientation;
    },
    getTeamMemberCount() {
      var teamMemberCount = 0;
      for (var i = 0; i < this.players.length; i++) {
        if (this.players[i].team === this.PlayerFormValues.team) {
          teamMemberCount++;
        }
      }
      return teamMemberCount;
    },
    checkIfSpareNumber(team, number) {
      if (number === '') {
        return false;
      }
      for (var i = 0; i < this.players.length; i++) {
        if (team === this.players[i].team && number === this.players[i].number) {
          return false;
        }
      }
      return true;
    },
    getSpareNumber(team) {
      for (var i = 1; i <= 99; i++) {
        var selected = false;
        for (var j = 0; j < this.players.length; j++) {
          if (team === this.players[j].team && i.toString(10) === this.players[j].number) {
            selected = true;
          }
        }
        if (!selected) {
          return i.toString(10);
        }
      }
      return '1';
    },
    getPlayer(team, color, number, name, path, speed) {
      var player = {};
      player.id = ++this.uniqueIndex;
      if (team) {
        player.team = team;
      } else {
        player.team = '1';
      }
      if (color) {
        player.color = color;
      } else {
        player.color = '#ffffff';
      }
      if (number || number === '') {
        player.number = number;
      } else {
        player.number = this.getSpareNumber(player.team);
      }
      if (name || name === '') {
        player.name = name;
      } else {
        player.name = 'Player';
      }
      if (path) {
        player.path = path;
        player.current = { step: 0, position: path[0], wait: 0 };
      } else {
        player.path = [{ x: 0, y: 0 }];
        player.current = { step: 0, position: { x: 0, y: 0 }, wait: 0 };
      }
      if (speed) {
        player.speed = speed;
      } else {
        player.speed = [{ val: 2.68224, wait: 0 }];
      }
      return player;
    },
  }
}
</script>
