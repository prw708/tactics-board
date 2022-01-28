<template lang="pug">
template(v-if="!this.loadLoading")
  form(
    v-if="!this.viewOnly && playerPaths.length > 1" 
    class="pt-4 px-4"
  )
    h5(class="mb-4") Player Path
    div(class="row gx-2")
      div(class="col-3 col-sm-2") From X
      div(class="col-3 col-sm-2") From Y
      div(class="col-3 col-sm-2") To X
      div(class="col-3 col-sm-2") To Y
      div(class="d-none d-sm-block col-sm-2")
        | Speed (mph)
      div(class="d-none d-sm-block col-sm-2")
        | Wait (s)
    template(
      v-for="(path, index) in playerPaths"
    )
      div(
        v-if="(index !== playerPaths.length - 1)"
        class="row gx-2 mt-2"
      )
        div(class="col-3 col-sm-2")
          input(
            type="text"
            class="form-control form-control-sm"
            :placeholder="path.x"
            disabled
            readonly
          )
        div(class="col-3 col-sm-2")
          input(
            type="text"
            class="form-control form-control-sm"
            :placeholder="path.y"
            disabled
            readonly
          )
        div(class="col-3 col-sm-2")
          input(
            type="text"
            class="form-control form-control-sm"
            :placeholder="(index + 1 < playerPaths.length) ? playerPaths[index + 1].x : ''"
            disabled
            readonly
          )
        div(class="col-3 col-sm-2")
          input(
            type="text"
            class="form-control form-control-sm"
            :placeholder="(index + 1 < playerPaths.length) ? playerPaths[index + 1].y : ''"
            disabled
            readonly
          )
        div(class="col-12 col-sm-2 mt-2 mt-sm-0")
          div(class="row gx-2")
            label(class="col-6 col-form-label d-block d-sm-none")
              | Speed (mph)
            div(class="col-6 col-sm-12")
              input(
                type="text"
                :class="(speedErrors[index]) ? \
                          'form-control form-control-sm is-invalid' : \
                          'form-control form-control-sm'"
                :name="'pfSpeed' + index"
                :id="'pfSpeed' + index"
                :value="(this.PathFormValues) ? this.PathFormValues[index].speed : ''"
                @input="handleSpeedFields($event, index)"
                autocomplete="off"
                maxlength="4"
              )
        div(class="col-12 col-sm-2 mt-2 mt-sm-0")
          div(class="row gx-2")
            label(class="col-6 col-form-label d-block d-sm-none")
              | Wait (s)
            div(class="col-6 col-sm-12")
              input(
                type="text"
                :class="(waitErrors[index]) ? \
                          'form-control form-control-sm is-invalid' : \
                          'form-control form-control-sm'"
                :name="'pfWait' + index"
                :id="'pfWait' + index"
                :value="(this.PathFormValues) ? this.PathFormValues[index].wait : ''"
                @input="handleWaitFields($event, index)"
                autocomplete="off"
                maxlength="4"
                :disabled="(parseFloat(this.PathFormValues[index].speed) === 0) ? false : true"
                :readonly="(parseFloat(this.PathFormValues[index].speed) === 0) ? false : true"
              )
</template>

<script>
export default {
  props: [
    'selectedPlayer',
    'players',
    'PathFormValues',
    'dimensions',
    'forcePlayerUpdate',
    'validate',
    'viewOnly',
    'loadLoading',
  ],
  emits: [
    'PathFormValues',
    'validPaths',
  ],
  data() {
    return {
      playerPaths: [],
      speedErrors: [],
      waitErrors: [],
    }
  },
  watch: {
    forcePlayerUpdate() {
      if (this.selectedPlayer !== -1) {
        var newPaths = [];
        var paths = this.players[this.players.length - 1].path;
        var newSpeeds = [];
        var speeds = this.players[this.players.length - 1].speed;
        this.speedErrors = new Array(speeds.length);
        this.waitErrors = new Array(speeds.length);
        for (var i = 0; i < paths.length; i++) {
          if (this.dimensions.orientation === 'v') {
            newPaths.push({
              x: paths[i].y.toFixed(2),
              y: paths[i].x.toFixed(2),
            });
          } else {
            newPaths.push({
              x: paths[i].x.toFixed(2),
              y: paths[i].y.toFixed(2),
            });
          }
          if (i < speeds.length) {
            var mph, seconds;
            if (speeds[i].val === '') {
              mph = '';
            } else {
              mph = speeds[i].val * (1 / 1609.34) * (3600);
              if (mph.toString().length > 4) {
                mph = mph.toString().substring(0, 4);
              } else {
                mph = mph.toString();
              }
            }
            if (speeds[i].val !== 0) {
              seconds = '';
            } else {
              seconds = speeds[i].wait / 1000;
              if (seconds.toString().length > 4) {
                seconds = seconds.toString().substring(0, 4);
              } else {
                seconds = seconds.toString();
              }
            }
            if (this.validateNumber(mph)) {
              this.speedErrors[i] = false;
            } else {
              this.speedErrors[i] = true;
            }
            if (this.validateNumber(seconds)) {
              this.waitErrors[i] = false;
            } else {
              this.waitErrors[i] = true;
            }
            newSpeeds.push({
              speed: mph,
              wait: seconds,
            });
          }
        }
        this.playerPaths = newPaths;
        this.$emit('PathFormValues', newSpeeds);
      } else {
        this.playerPaths = [];
        this.speedErrors = [];
        this.waitErrors = [];
      }
    },
    validate(val) {
      if (val) {
        var invalid = false;
        for (var i = 0; i < this.PathFormValues.length; i++) {
          if (!this.validateNumber(this.PathFormValues[i].speed)) {
            this.speedErrors[i] = true;
            invalid = true;
          } else {
            this.speedErrors[i] = false;
          }
          if (!this.validateNumber(this.PathFormValues[i].wait)) {
            this.waitErrors[i] = true;
            invalid = true;
          } else {
            this.waitErrors[i] = false;
          }
        }
        if (invalid) {
          this.$emit('validPaths', false);
        } else {
          this.$emit('validPaths', true);
        }
      } else {
        this.$emit('validPaths', false);
      }
    },
  },
  methods: {
    validateNumber(number) {
      if (number === '' || /^(((([1-9][0-9])|([0-9]))(\.[0-9]{1,2})?)|(\.[0-9]{1,2}))$/.test(number)) {
        return true;
      }
      return false;
    },
    handleSpeedFields(event, index) {
      var vals = new Array(this.playerPaths.length - 1);
      for (var i = 0; i < this.playerPaths.length - 1; i++) {
        vals[i] = {};
        vals[i].speed = (this.PathFormValues[i]) ? this.PathFormValues[i].speed : null;
        vals[i].wait = (this.PathFormValues[i]) ? this.PathFormValues[i].wait : null;
        vals[i].speedError = false;
      }
      if (this.validateNumber(event.target.value)) {
        this.speedErrors[index] = false;
        vals[index].speedError = false;
        if (parseFloat(event.target.value) !== 0) {
          this.waitErrors[index] = false;
        }
      } else {
        this.speedErrors[index] = true;
        vals[index].speedError = true;
      }
      vals[index].speed = event.target.value;
      if (parseFloat(event.target.value) === 0) {
        vals[index].wait = this.PathFormValues[index].wait;
      } else {
        vals[index].wait = '';
      }
      this.$emit('PathFormValues', vals);
    },
    handleWaitFields(event, index) {
      var vals = new Array(this.playerPaths.length - 1);
      for (var i = 0; i < this.playerPaths.length - 1; i++) {
        vals[i] = {};
        vals[i].speed = (this.PathFormValues[i]) ? this.PathFormValues[i].speed : null;
        vals[i].wait = (this.PathFormValues[i]) ? this.PathFormValues[i].wait : null;
        vals[i].waitError = false;
      }
      if (this.validateNumber(event.target.value)) {
        this.waitErrors[index] = false;
        vals[index].waitError = false;
      } else {
        this.waitErrors[index] = true;
        vals[index].waitError = true;
      }
      vals[index].speed = this.PathFormValues[index].speed;
      if (parseFloat(this.PathFormValues[index].speed) === 0) {
        vals[index].wait = event.target.value;
      } else {
        vals[index].wait = '';
      }
      this.$emit('PathFormValues', vals);
    },
  }
}
</script>
