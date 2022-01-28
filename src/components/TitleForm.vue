<template lang="pug">
form(
  v-if="!this.loadLoading"
  class="p-4"
)
  div(class="row")
    div(class="col-sm-7 col-md-6 mb-4 mb-sm-0")
      div(class="row")
        label(class="col-4 col-sm-3 col-md-2 col-form-label" for="tfTitle")
          h5(class="mb-0") Title
        div(class="col-8 col-sm-9 col-md-10")
          input(
            type="text"
            :class="(titleError) ? 'form-control is-invalid' : 'form-control'"
            name="tfTitle"
            id="tfTitle"
            :value="(this.TitleFormValues) ? this.TitleFormValues.title : ''"
            @input="handleTitleField"
            autocomplete="off"
            maxlength="50"
            :disabled="(this.viewOnly) ? 'disabled' : null"
          )
          div(
            v-if="titleError"
            class="invalid-feedback"
          ) {{ titleError }}
    div(class="col-sm-5 col-md-6 mb-4 text-sm-end")
      div(class="row")
        label(class="col-4 col-form-label d-sm-none")
          h5(class="mb-0") Actions
        div(class="col-8 col-sm-12")
          button(
            type="button"
            :class="(!this.play) ? \
              'btn btn-outline-success play-icon me-2' : \
              'btn btn-success play-icon-active me-2'"
            @click="handlePlayButton"
            value="Play"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Play"
            :disabled="(this.saveLoading) ? 'disabled' : null"
          )
          button(
            type="button"
            :class="(!this.play) ? \
              'btn btn-danger stop-icon-active me-2' : \
              'btn btn-outline-danger stop-icon me-2'"
            @click="handleStopButton"
            value="Stop"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Stop"
            :disabled="(this.saveLoading) ? 'disabled' : null"
          )
          button(
            type="button"
            :class="(!this.saveLoading) ? 'btn btn-outline-secondary save-icon' : 'btn btn-secondary'"
            @click="handleSaveButton"
            value="Save"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Save"
            :disabled="(this.viewOnly || this.saveLoading) ? 'disabled' : null"
          )
            template(
              v-if="this.saveLoading"
            )
              span(
                class="spinner-border spinner-border-sm"
                role="status"
              )
              span(class="visually-hidden") Saving...
          div(
            v-if="actionsError"
            class="input-group"
          )
            span(class="is-invalid")
            div(class="invalid-feedback") {{ actionsError }}
  div(class="row")
    div(class="col-sm-7 col-md-6 mb-sm-0")
      div(class="row g-0")
        div(class="form-check col-8 col-sm-9 col-md-10")
          input(
            type="checkbox"
            :class="(publicError) ? 'form-check-input is-invalid' : 'form-check-input'"
            name="tfPublic"
            id="tfPublic"
            :checked="(this.TitleFormValues) ? this.TitleFormValues.public : false"
            @input="handlePublicField"
            :disabled="(this.viewOnly) ? 'disabled' : null"
          )
          label(
            class="form-check-label"
            for="tfPublic"
          ) Make public
          div(
            v-if="publicError"
            class="invalid-feedback"
          ) {{ publicError }}
</template>

<script>
export default {
  props: [
    'selectedMode',
    'selectedPlayer',
    'TitleFormValues',
    'validate',
    'viewOnly',
    'loadLoading',
    'saveLoading',
  ],
  emits: [
    'update:selectedMode',
    'update:selectedPlayer',
    'TitleFormValues', 
    'SaveBoard', 
    'validTitle',
  ],
  data() {
    return {
      actions: ['play', 'stop', 'save'],
      play: false,
      titleError: null,
      actionsError: null,
      publicError: null,
    }
  },
  watch: {
    selectedMode(val) {
      if (val !== 'Play') {
        this.play = false;
      }
    },
    validate(val) {
      if (val) {
        this.play = false;
        if (this.TitleFormValues && 
            this.validateTitle(this.TitleFormValues.title) &&
            (this.TitleFormValues.public === true || this.TitleFormValues.public === false)) {
          this.titleError = null;
          this.publicError = null;
          this.$emit('validTitle', true);
        } else if (this.validateTitle(this.TitleFormValues.title) &&
            (this.TitleFormValues.public !== true || this.TitleFormValues.public !== false)) {
          this.publicError = "Must be checked or unchecked.";
          this.$emit('validTitle', false);
        } else {
          this.titleError = "Must not be empty. Can contain A-Z, a-z, 0-9, spaces, and _.,?!-.";
          this.$emit('validTitle', false);
        }
      } else {
        this.$emit('validTitle', false);
      }
    },
  },
  methods: {
    validateAction(action) {
      var actions = this.actions;
      for (var i = 0; i < actions.length; i++) {
        if (action.toLowerCase() === actions[i]) {
          return true;
        }
      }
      return false;
    },
    handlePlayButton(event) {
      var action;
      if (!event.target.value) {
        action = event.target.parentNode.value;
      } else {
        action = event.target.value;
      }
      if (this.validateAction(action)) {
        if (!this.play) {
          this.actionsError = null;
          this.$emit('update:selectedMode', '');
          this.$nextTick(function() {
            this.play = true;
            this.$emit('update:selectedMode', 'Play');
            this.$emit('update:selectedPlayer', -1);
          }); 
        }
      } else {
        this.actionsError = 'Must be among ' + this.actions.join(', ');
        this.$emit('update:selectedMode', '');
      }
    },
    handleStopButton(event) {
      var action;
      if (!event.target.value) {
        action = event.target.parentNode.value;
      } else {
        action = event.target.value;
      }
      if (this.validateAction(action)) {
        if (this.play) {
          this.actionsError = null;
          this.play = false;
          this.$emit('update:selectedMode', '');
        }
      } else {
        this.actionsError = 'Must be among ' + this.actions.join(', ');
        this.$emit('update:selectedMode', '');
      }
    },
    handleSaveButton(event) {
      var action;
      if (!event.target.value) {
        action = event.target.parentNode.value;
      } else {
        action = event.target.value;
      }
      if (this.validateAction(action)) {
        this.actionsError = null;
        this.play = false;
        this.$emit('update:selectedMode', '');
        this.$nextTick(function() {
          this.$emit('SaveBoard');
        }); 
      } else {
        this.actionsError = 'Must be among ' + this.actions.join(', ');
      }
    },
    validateTitle(title) {
      if (/^[A-Za-z0-9 _,!.?-]{1,50}$/.test(title)) {
        return true;
      }
      return false;
    },
    handleTitleField(event) {
      if (this.validateTitle(event.target.value)) {
        this.titleError = null;
        this.$emit('TitleFormValues', {
          titleError: false, 
          title: event.target.value,
          publicError: false,
          public: this.TitleFormValues.public,
        });
      } else {
        this.titleError = "Must not be empty. Can contain A-Z, a-z, 0-9, spaces, and _.,?!-.";
        this.$emit('TitleFormValues', {
          titleError: true, 
          title: event.target.value,
          publicError: false,
          public: this.TitleFormValues.public,
        });
      }
    },
    handlePublicField(event) {
      if (this.TitleFormValues.public === true || this.TitleFormValues.public === false) {
        this.publicError = null;
        this.$emit('TitleFormValues', {
          titleError: false,
          title: this.TitleFormValues.title,
          publicError: false,
          public: event.target.checked,
        });
      } else {
        this.publicError = "Must be checked or unchecked.";
        this.$emit('TitleFormValues', {
          titleError: false,
          title: this.TitleFormValues.title,
          publicError: true,
          public: event.target.checked,
        });
      }
    },
  }
}
</script>
