<template lang="pug">
form(
  v-if="!this.loadLoading"
  class="p-4"
)
  div(class="row g-4")
    div(class="col-sm-6 col-lg-12")
      h5(class="mb-4") Sports Field
      select(
        :class="(fieldError) ? 'form-select is-invalid' : 'form-select'"
        name="pfField"
        id="pfField"
        @change="handleSelectField"
      )
        option(
          v-for="field in fields"
          :value="field"
          :selected="(field === selectedField) ? true : false"
        ) {{ field }}
      div(
        v-if="fieldError"
        class="invalid-feedback mb-0 mb-sm-4"
      ) {{ fieldError }}
    div(class="col-sm-6 col-lg-12 mb-3")
      h5(class="mb-4") Editing Mode
      button(
        type="button" 
        :class="(modes.insert) ? \
                  ((modesError) ? \
                  'btn btn-success person-plus-icon-active me-2' : \
                  'btn btn-success person-plus-icon-active me-2 mb-2') : \
                  ((modesError) ? \
                  'btn btn-outline-success person-plus-icon me-2' : \
                  'btn btn-outline-success person-plus-icon me-2 mb-2')"
        @click="handleInsertButton"
        value="Insert"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Insert Player"
      )
      button(
        type="button" 
        :class="(modes.delete) ? \
                  ((modesError) ? \
                  'btn btn-danger person-minus-icon-active me-2' : \
                  'btn btn-danger person-minus-icon-active me-2 mb-2') : \
                  ((modesError) ? \
                  'btn btn-outline-danger person-minus-icon me-2' : \
                  'btn btn-outline-danger person-minus-icon me-2 mb-2')"
        @click="handleDeleteButton"
        value="Delete"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Delete Player"
      )
      button(
        type="button" 
        :class="(modes.path) ? \
                  ((modesError) ? \
                  'btn btn-info node-plus-icon-active me-2' : \
                  'btn btn-info node-plus-icon-active me-2 mb-2') : \
                  ((modesError) ? \
                  'btn btn-outline-info node-plus-icon me-2' : \
                  'btn btn-outline-info node-plus-icon me-2 mb-2')"
        @click="handlePathButton"
        value="Path"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Modify Player Path"
      )
      button(
        type="button" 
        :class="(modes.reset) ? \
                  ((modesError) ? \
                  'btn btn-danger reset-icon-active me-2' : \
                  'btn btn-danger reset-icon-active me-2 mb-2') : \
                  ((modesError) ? \
                  'btn btn-outline-danger reset-icon me-2' : \
                  'btn btn-outline-danger reset-icon me-2 mb-2')"
        @click="handleResetButton"
        value="Reset"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Reset Player Path"
      )
      div(
        v-if="modesError"
        class="input-group"
      )
        span(class="is-invalid")
        div(class="invalid-feedback") {{ modesError }}
  div(class="row gx-4 g-lg-4 mb-0")
    h5(class="mb-4 mb-lg-0") Player Information
    div(
      v-if="genericError"
      class="col-12 mb-4 mb-lg-0"
    )
      div(class="alert alert-danger px-4 py-3 mb-0") {{ genericError }}
    div(class="col-6 col-sm-2 col-lg-6 mb-4 mb-sm-0")
      label(
        class="form-label"
        for="pfTeam"
      ) Team
      select(
        :class="(teamsError) ? 'form-select is-invalid' : 'form-select'"
        name="pfTeam"
        id="pfTeam"
        @change="handleTeamField"
      )
        option(
          v-for="team in teams"
          :value="team"
          :selected="(this.PlayerFormValues && this.PlayerFormValues.team === team) ? true : false"
        ) {{ team }}
      div(
        v-if="teamsError"
        class="invalid-feedback"
      ) {{ teamsError }}
    div(class="col-6 col-sm-2 col-lg-6 mb-4 mb-sm-0")
      label(
        class="form-label"
        for="pfColor"
      ) Color
      input(
        type="color"
        :class="(colorError) ? 'form-control form-control-color is-invalid' : 'form-control form-control-color'"
        name="pfColor"
        id="pfColor"
        :value="(this.PlayerFormValues) ? this.PlayerFormValues.color : '#ffffff'"
        @input="handleColorField"
        autocomplete="off"
        maxlength="7"
      )
      div(
        v-if="colorError"
        class="invalid-feedback"
      ) {{ colorError }}
    div(class="col-sm-2 col-lg-12 mb-4 mb-sm-0")
      label(
        class="form-label"
        for="pfNumber"
      ) Number
      input(
        type="text"
        :class="(numberError) ? 'form-control is-invalid' : 'form-control'"
        name="pfNumber"
        id="pfNumber"
        :value="(this.PlayerFormValues) ? this.PlayerFormValues.number : ''"
        @input="handleNumberField"
        autocomplete="off"
        maxlength="2"
      )
      div(
        v-if="numberError"
        class="invalid-feedback"
      ) {{ numberError }}
    div(class="col-sm-6 col-lg-12")
      label(
        class="form-label"
        for="pfName"
      ) Name
      input(
        type="text"
        :class="(nameError) ? 'form-control is-invalid' : 'form-control'"
        name="pfName"
        id="pfName"
        :value="(this.PlayerFormValues) ? this.PlayerFormValues.name : ''"
        @input="handleNameField"
        autocomplete="off"
        maxlength="50"
      )
      div(
        v-if="nameError"
        class="invalid-feedback"
      ) {{ nameError }}
</template>

<script>
export default {
  props: [
    'selectedField',
    'selectedMode',
    'PlayerFormValues',
    'playerError',
    'validate',
    'loadLoading',
  ],
  emits: [
    'update:selectedField', 
    'update:selectedMode', 
    'PlayerFormValues', 
    'update:playerError', 
    'validPlayers',
  ],
  data() {
    return {
      fields: ['Soccer', 'Basketball', 'American Football'],
      modes: { insert: false, delete: false, path: false, reset: false },
      teams: ['1', '2', 'Ball'],
      genericError: null,
      fieldError: null,
      modesError: null,
      teamsError: null,
      colorError: null,
      numberError: null,
      nameError: null,
    }
  },
  watch: {
    playerError(val) {
      if (val === '') {
        this.numberError = null;
        this.genericError = null;
      } else if (val === 'DUPLICATENUMBER') {
        this.numberError = 'Duplicate number in the same team';
      } else if (val === 'TEAMMAXPLAYERS') {
        this.genericError = 'Team has reached the max outfield players';
      }
    },
    selectedMode(val) {
      if (val === '') {
        this.modes.insert = false;
        this.modes.delete = false;
        this.modes.path = false;
        this.modes.reset = false;
      }
    },
    validate(val) {
      if (val) {
        this.modes.insert = false;
        this.modes.delete = false;
        this.modes.path = false;
        this.modes.reset = false;
        if (this.PlayerFormValues &&
            this.validateField(this.selectedField) &&
            (this.validateMode(this.selectedMode) || !this.selectedMode ) &&
            this.validateTeam(this.PlayerFormValues.team) &&
            this.validateColor(this.PlayerFormValues.color) &&
            (this.validateNumber(this.PlayerFormValues.number) || !this.PlayerFormValues.number) &&
            this.validateName(this.PlayerFormValues.name)) {
          this.genericError = null;
          this.$emit('validPlayers', true);
        } else {
          this.genericError = 'Player values not valid.';
          this.$emit('validPlayers', false);
        }
      } else {
        this.$emit('validPlayers', false);
      }
    }
  },
  methods: {
    validateField(field) {
      for (var i = 0; i < this.fields.length; i++) {
        if (field === this.fields[i]) {
          return true;
        }
      }
      return false;
    },
    handleSelectField(event) {
      if (this.validateField(event.target.value)) {
        this.fieldError = null;
        this.$emit('update:playerError', '');
        this.$emit('update:selectedField', event.target.value);
      } else {
        this.fieldError = 'Must be among ' + this.fields.join(', ') + '.';
      }
    },
    validateMode(mode) {
      var modes = Object.keys(this.modes);
      for (var i = 0; i < modes.length; i++) {
        if (mode.toLowerCase() === modes[i]) {
          return true;
        }
      }
      return false;
    },
    handleInsertButton(event) {
      var mode;
      if (!event.target.value) {
        mode = event.target.parentNode.value;
      } else {
        mode = event.target.value;
      }
      if (this.validateMode(mode)) {
        this.modesError = null;
        this.modes.insert = !this.modes.insert;
        this.modes.delete = false;
        this.modes.path = false;
        this.modes.reset = false;
        if (this.modes.insert) {
          this.$emit('update:playerError', '');
          this.$emit('update:selectedMode', mode);
        } else {
          this.$emit('update:selectedMode', '');
        }
      } else {
        this.modesError = 'Must be among ' + Object.keys(this.modes).join(', ') + '.';
      }
    },
    handleDeleteButton(event) {
      var mode;
      if (!event.target.value) {
        mode = event.target.parentNode.value;
      } else {
        mode = event.target.value;
      }
      if (this.validateMode(mode)) {
        this.modesError = null;
        this.modes.insert = false;
        this.modes.delete = !this.modes.delete;
        this.modes.path = false;
        this.modes.reset = false;
        if (this.modes.delete) {
          this.$emit('update:playerError', '');
          this.$emit('update:selectedMode', mode);
        } else {
          this.$emit('update:selectedMode', '');
        }
      } else {
        this.modesError = 'Must be among ' + Object.keys(this.modes).join(', ') + '.';
      }
    },
    handlePathButton(event) {
      var mode;
      if (!event.target.value) {
        mode = event.target.parentNode.value;
      } else {
        mode = event.target.value;
      }
      if (this.validateMode(mode)) {
        this.modesError = null;
        this.modes.insert = false;
        this.modes.delete = false;
        this.modes.path = !this.modes.path;
        this.modes.reset = false;
        if (this.modes.path) {
          this.$emit('update:playerError', '');
          this.$emit('update:selectedMode', mode);
        } else {
          this.$emit('update:selectedMode', '');
        }
      } else {
        this.modesError = 'Must be among ' + Object.keys(this.modes).join(', ') + '.';
      }
    },
    handleResetButton(event) {
      var mode;
      if (!event.target.value) {
        mode = event.target.parentNode.value;
      } else {
        mode = event.target.value;
      }
      if (this.validateMode(mode)) {
        this.modesError = null;
        this.modes.insert = false;
        this.modes.delete = false;
        this.modes.path = false;
        this.modes.reset = !this.modes.reset;
        if (this.modes.reset) {
          this.$emit('update:playerError', '');
          this.$emit('update:selectedMode', mode);
        } else {
          this.$emit('update:selectedMode', '');
        }
      } else {
        this.modesError = 'Must be among ' + Object.keys(this.modes).join(', ') + '.';
      }
      
    },
    validateTeam(team) {
      for (var i = 0; i < this.teams.length; i++) {
        if (team === this.teams[i]) {
          return true;
        }
      }
      return false;
    },
    handleTeamField(event) {
      if (this.validateTeam(event.target.value)) {
        this.teamsError = null;
        this.$emit('update:playerError', '');
        this.$emit('PlayerFormValues', {
          teamChange: true,
          teamsError: false,
          team: event.target.value,
          color: this.PlayerFormValues.color,
          number: this.PlayerFormValues.number,
          name: this.PlayerFormValues.name,
        });
      } else {
        this.teamsError = 'Must be among ' + this.teams.join(', ') + '.';
      }
    },
    validateColor(color) {
      if (/^#[A-Fa-f0-9]{6}$/.test(color)) {
        return true;
      }
      return false;
    },
    handleColorField(event) {
      if (this.validateColor(event.target.value)) {
        this.colorError = null;
        this.$emit('update:playerError', '');
        this.$emit('PlayerFormValues', {
          teamChange: false,
          colorError: false,
          team: this.PlayerFormValues.team,
          color: event.target.value,
          number: this.PlayerFormValues.number,
          name: this.PlayerFormValues.name,
        });
      } else {
        this.colorError = 'Must be #XXXXXX.';
      }
    },
    validateNumber(number) {
      if (/^[0-9]{1,2}$/.test(number) && number >= 0 && number <= 99) {
        return true;
      }
      return false;
    },
    handleNumberField(event) {
      if (this.validateNumber(event.target.value)) {
        this.numberError = null;
        this.$emit('update:playerError', '');
        this.$emit('PlayerFormValues', {
          teamChange: false,
          numberError: false,
          team: this.PlayerFormValues.team,
          color: this.PlayerFormValues.color,
          number: event.target.value,
          name: this.PlayerFormValues.name,
        });
      } else {
        this.numberError = 'Must be from 0 to 99.';
      }
    },
    validateName(name) {
      if (/^[A-Za-z \-']{0,50}$/.test(name)) {
        return true;
      }
      return false;
    },
    handleNameField(event) {
      if (this.validateName(event.target.value)) {
        this.nameError = null;
        this.$emit('update:playerError', '');
        this.$emit('PlayerFormValues', {
          teamChange: false,
          nameError: false,
          team: this.PlayerFormValues.team,
          color: this.PlayerFormValues.color,
          number: this.PlayerFormValues.number,
          name: event.target.value,
        });
      } else {
        this.nameError = "Can contain A-Z, a-z, spaces, ', and -.";
      }
    },
  }
}
</script>
