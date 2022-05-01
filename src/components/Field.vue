<template lang="pug">
div(
  v-show="!this.loadLoading"
  class="col-12"
)
  canvas(
    ref="canvasElement" 
    @click="handleFieldClick"
    @pointerdown="handleFieldMouseDown"
    @pointermove="handleFieldMouseMove"
    @pointerup="handleFieldMouseUp"
  )
</template>

<script>
export default {
  props: [
    'selectedField', 
    'selectedMode', 
    'selectedPlayer', 
    'prevSelectedPlayer',
    'players',
    'forcePlayerUpdate',
    'loadLoading',
  ],
  emits: [
    'update:selectedMode', 
    'update:selectedPlayer', 
    'update:prevSelectedPlayer', 
    'update:players', 
    'createPlayer',
    'deletePlayer',
    'editPlayerPath',
    'resetPlayerPath',
    'setPositions',
    'resetPositions',
    'update:forcePlayerUpdate',
    'updateDimensions',
  ],
  mounted() {
    this.$refs.canvasElement.parentNode.style.width = '100%';
    this.setupCanvas();
    this.$emit('updateDimensions', {
      width: this.width,
      height: this.height,
      orientation: this.orientation,
    });
    this.setupCanvas();
    window.addEventListener('resize', this.resize, false);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resize, false);
  },
  data() {
    return {
      width: 0,
      isDragging: false,
      mostRecentSelectedPlayerId: 0,
      prevTime: 0,
      currentFrame: null,
      frameDuration: 1 / 60,
      resetCurrTime: false,
    }
  },
  computed: {
    height() {
      if (this.selectedField === 'Soccer') {
        if (this.orientation === 'v') {
          return (this.width * 105 / 67.5);
        } else {
          return (this.width * 67.5 / 105);
        }
      } else if (this.selectedField === 'Basketball') {
        if (this.orientation === 'v') {
          return (this.width * 28.7 / 15.2);
        } else {
          return (this.width * 15.2 / 28.7);
        }
      } else if (this.selectedField === 'American Football') {
        if (this.orientation === 'v') {
          return (this.width * 109.728 / 48.8);
        } else {
          return (this.width * 48.8 / 109.728);
        }
      }
      return 0;
    },
    orientation() {
      if (this.width < 576) {
        return 'v';
      } else {
        return 'h';
      }
    },
    widthConversion() {
      if (this.selectedField === 'Soccer') {
        if (this.orientation === 'h') {
          return this.width / 105;
        } else {
          return this.height / 105;
        }
      } else if (this.selectedField === 'Basketball') {
        if (this.orientation === 'h') {
          return this.width / 28.7;
        } else {
          return this.height / 28.7;
        }
      } else if (this.selectedField === 'American Football') {
        if (this.orientation === 'h') {
          return this.width / 109.728;
        } else {
          return this.height / 109.728;
        }
      }
      return 1;
    },
    heightConversion() {
      if (this.selectedField === 'Soccer') {
        if (this.orientation === 'h') {
          return this.height / 67.5;
        } else {
          return this.width / 67.5;
        }
      } else if (this.selectedField === 'Basketball') {
        if (this.orientation === 'h') {
          return this.height / 15.2;
        } else {
          return this.width / 15.2;
        }
      } else if (this.selectedField === 'American Football') {
        if (this.orientation === 'h') {
          return this.height / 48.8;
        } else {
          return this.width / 48.8;
        }
      }
      return 1;
    },
    ballRadius() {
      return this.playerRadius / 2;
    },
    playerRadius() {
      if (this.selectedField === 'Soccer') {
        return this.widthConversion * 1.5;
      } else if (this.selectedField === 'Basketball') {
        return this.widthConversion * 0.5;
      } else if (this.selectedField === 'American Football') {
        return this.widthConversion * 1.25;
      }
      return 1;
    },
    playerFontSize() {
      if (this.selectedField === 'Soccer') {
        return this.widthConversion * 1.5;
      } else if (this.selectedField === 'Basketball') {
        return this.widthConversion * 0.5;
      } else if (this.selectedField === 'American Football') {
        return this.widthConversion * 1.25;
      }
      return 1;
    },
  },
  watch: {
    selectedField() {
      window.cancelAnimationFrame(this.currentFrame);
      this.prevTime = 0;
      this.$emit('resetPositions');
      this.$emit('update:selectedMode', '');
      this.$nextTick(function() {
        this.setupCanvas();
      });
    },
    selectedMode(val) {
      if (val === 'Play') {
        this.animateCanvas();
      } else {
        window.cancelAnimationFrame(this.currentFrame);
        this.prevTime = 0;
        this.$emit('resetPositions');
        this.$nextTick(function() {
          this.setupCanvas();
        });
      }
    },
    forcePlayerUpdate(val) {
      if (val) {
        this.setupCanvas();
        this.$emit('update:forcePlayerUpdate', false);
      }
    },
    loadLoading(val) {
      if (!val) {
        this.$nextTick(function() {
          this.$refs.canvasElement.parentNode.style.width = '100%';
          this.setupCanvas();
          this.$emit('updateDimensions', {
            width: this.width,
            height: this.height,
            orientation: this.orientation,
          });
        });
      }
    },
  },
  methods: {
    distance(x1, y1, x2, y2) {
      return Math.sqrt((x2 - x1)**2 + (y2 - y1)**2);
    },
    getSelectedPlayer(coords) {
      for (var i = this.players.length - 1; i >= 0; i--) {
        var distance;
        if (this.orientation === 'v') {
          distance = this.distance(
            this.players[i].path[0].x * this.width,
            -1 * (this.players[i].path[0].y - 1) * this.height,
            coords.x * this.width,
            -1 * (coords.y - 1) * this.height,
          );
        } else {
          distance = this.distance(
            this.players[i].path[0].x * this.width,
            this.players[i].path[0].y * this.height,
            coords.x * this.width,
            coords.y * this.height,
          );
        }
        var radius;
        if (this.players[i].team === 'Ball') {
          radius = this.ballRadius;
        } else {
          radius = this.playerRadius;
        }
        if (distance <= radius) {
          var playersCopy = this.players;
          var selectedPlayerCopy = this.players[i];
          playersCopy.splice(i, 1);
          playersCopy.push(selectedPlayerCopy);
          this.$emit('update:selectedPlayer', i);
          this.$emit('update:players', playersCopy);
          this.$emit('update:forcePlayerUpdate', true);
          if (this.selectedMode === 'Path') {
            this.mostRecentSelectedPlayerId = 0;
          }
          this.$nextTick(function() {
            this.$emit('update:selectedPlayer', this.players.length - 1);
            this.$emit('update:prevSelectedPlayer', this.players.length - 1);
          });
          return selectedPlayerCopy;
        }
      }
      if (this.selectedMode === 'Path') {
        this.mostRecentSelectedPlayerId = this.players[this.players.length - 1].id;
        this.$emit('update:prevSelectedPlayer', this.players.length - 1);
      } else {
        this.mostRecentSelectedPlayerId = 0;
      }
      this.$emit('update:selectedPlayer', -1);
    },
    handleFieldClick(event) {
      var canvasRect = event.target.getBoundingClientRect();
      var rawX = event.clientX - canvasRect.left;
      var rawY = event.clientY - canvasRect.top;
      var x, y;
      if (this.orientation === 'v') {
        x = 1 - (rawY / this.height);
        y = rawX / this.width;
      } else {
        x = rawX / this.width;
        y = rawY / this.height;
      }
      var coords = { x: x, y: y };
      if (this.selectedMode !== 'Play') {
        this.getSelectedPlayer(coords);
      }
      this.$nextTick(function() {
        if (this.selectedPlayer === -1 && this.selectedMode === 'Insert') {
          this.$emit('createPlayer', coords);
          this.$emit('update:forcePlayerUpdate', true);
        } else if (this.selectedPlayer !== -1 && this.selectedMode === 'Delete') {
          this.$emit('deletePlayer');
          this.$emit('update:forcePlayerUpdate', true);
        } else if (this.selectedPlayer === -1 && this.prevSelectedPlayer !== -1 && this.selectedMode === 'Path') {
          if (this.mostRecentSelectedPlayerId === this.players[this.players.length - 1].id) {
            this.$emit('editPlayerPath', coords);
            this.$emit('update:forcePlayerUpdate', true);
          }
        } else if (this.selectedPlayer !== -1 && this.selectedMode === 'Reset') {
          this.$emit('resetPlayerPath');
          this.$emit('update:forcePlayerUpdate', true);
        } else if (this.selectedPlayer === -1 && this.prevSelectedPlayer !== -1) {
          var prevSelectedPlayerCopy = this.players[this.players.length - 1];
          prevSelectedPlayerCopy.path[0] = coords;
          prevSelectedPlayerCopy.current.position = coords;
          this.$emit('update:selectedPlayer', prevSelectedPlayerCopy);
          this.$emit('update:forcePlayerUpdate', true);
        }
      });
    },
    handleFieldMouseDown() {
      var canvasRect = event.target.getBoundingClientRect();
      var rawX = event.clientX - canvasRect.left;
      var rawY = event.clientY - canvasRect.top;
      var x, y;
      if (this.orientation === 'v') {
        x = 1 - (rawY / this.height);
        y = rawX / this.width;
      } else {
        x = rawX / this.width;
        y = rawY / this.height;
      }
      var coords = { x: x, y: y };
      if (this.selectedMode !== 'Play') {
        this.getSelectedPlayer(coords);
        this.isDragging = true;
      }
    },
    handleFieldMouseMove(event) {
      if (this.isDragging && this.selectedPlayer !== -1) {
        var canvasRect = event.target.getBoundingClientRect();
        var rawX = event.clientX - canvasRect.left;
        var rawY = event.clientY - canvasRect.top;
        var x, y;
        if (this.orientation === 'v') {
          x = 1 - (rawY / this.height);
          y = rawX / this.width;
        } else {
          x = rawX / this.width;
          y = rawY / this.height;
        }
        var coords = { x: x, y: y };
        var selectedPlayerCopy = this.players[this.players.length - 1];
        selectedPlayerCopy.path[0] = coords;
        selectedPlayerCopy.current.position = coords;
        this.$emit('update:selectedPlayer', selectedPlayerCopy);
        this.$emit('update:forcePlayerUpdate', true);
      }
    },
    handleFieldMouseUp() {
      this.isDragging = false;
    },
    resize() {
      if (Math.floor(this.$refs.canvasElement.parentNode.getBoundingClientRect().width) !== this.width) {
        this.$emit('updateDimensions', {
          width: this.width,
          height: this.height,
          orientation: this.orientation,
        });
        if (this.selectedMode === 'Play') {
          this.$emit('update:selectedMode', '');
        }
        this.$emit('update:forcePlayerUpdate', true);
      }
    },
    setupCanvas() {
      this.width = Math.floor(this.$refs.canvasElement.parentNode.getBoundingClientRect().width);
      this.$refs.canvasElement.parentNode.style.height = this.height + 'px';
      if (this.width > document.documentElement.clientWidth) {
        this.width = Math.floor(document.documentElement.clientWidth);
        this.$refs.canvasElement.parentNode.style.height = this.height + 'px';
      }
      if (this.selectedField === 'Soccer') {
        this.drawSoccerField();
      } else if (this.selectedField === 'Basketball') {
        this.drawBasketballCourt();
      } else if (this.selectedField === 'American Football') {
        this.drawAmericanFootballField();
      }
      if ((this.selectedPlayer !== -1 || this.prevSelectedPlayer !== -1) && 
          (this.selectedMode === 'Path' || this.selectedMode === 'Insert' || this.selectedMode === '')) {
        this.drawPlayerPaths(this.players[this.players.length - 1]);
      } else if (this.selectedMode === 'Reset') {
        for (var i = 0; i < this.players.length; i++) {
          this.drawPlayerPaths(this.players[i]);
        }
      }
      this.drawPlayers();
    },
    animateCanvas(currTime) {
      if (!currTime) {
        currTime = (this.frameDuration * 1000);
      }
      var elapsed = currTime - this.prevTime;
      if (elapsed >= (this.frameDuration * 1000)) {
        if (this.resetCurrTime) {
          elapsed = (this.frameDuration * 1000);
          this.resetCurrTime = false;
        }
        for (var i = 0; i < this.players.length; i++) {
          var current = this.movePlayer(this.players[i], elapsed);
          this.$emit('setPositions', i, current);
        }
        if (this.prevTime === 0) {
          this.resetCurrTime = true;
        }
        this.$nextTick(function() {
          this.setupCanvas();
          this.prevTime = currTime;
        });
      }
      this.currentFrame = window.requestAnimationFrame(this.animateCanvas);
    },
    movePlayer(player, elapsedTime) {
      if (this.selectedMode !== 'Play') {
        return { 
          step: 0, 
          position: player.path[0], 
          wait: 0,
        };
      }
      if (player.current.step < player.path.length - 1) {
        var pathDistance, pathDistanceX, pathDistanceY, angle;
        var duration, pxPositionChange;
        if (this.orientation === 'v') {
          pathDistance = this.distance(
            player.path[player.current.step].y * this.width,
            -1 * (player.path[player.current.step].x - 1) * this.height,
            player.path[player.current.step + 1].y * this.width,
            -1 * (player.path[player.current.step + 1].x - 1) * this.height,
          );
          pathDistanceX = 
            (-1 * (player.path[player.current.step + 1].x - 1) * this.height) - 
            (-1 * (player.path[player.current.step].x - 1) * this.height);
          pathDistanceY = 
            (player.path[player.current.step + 1].y * this.width) - 
            (player.path[player.current.step].y * this.width);
          angle = Math.atan2(-pathDistanceX, pathDistanceY);
        } else {
          pathDistance = this.distance(
            player.path[player.current.step].x * this.width,
            player.path[player.current.step].y * this.height,
            player.path[player.current.step + 1].x * this.width,
            player.path[player.current.step + 1].y * this.height,
          );
          pathDistanceX = 
            (player.path[player.current.step + 1].x * this.width) - 
            (player.path[player.current.step].x * this.width);
          pathDistanceY = 
            (player.path[player.current.step + 1].y * this.height) -
            (player.path[player.current.step].y * this.height);
          angle = Math.atan2(pathDistanceY, pathDistanceX);
        }
        if (!player.speed[player.current.step] || player.speed[player.current.step].val === 0) {
          pxPositionChange = 0;
        } else {
          duration = (1 / player.speed[player.current.step].val) * (1 / this.widthConversion) * pathDistance;
          pxPositionChange = pathDistance * ((elapsedTime / 1000) / duration);
        }
        var totalDistanceMoved;
        if (this.orientation === 'v') {
          totalDistanceMoved = this.distance(
            player.path[player.current.step].y * this.width,
            -1 * (player.path[player.current.step].x - 1) * this.height,
            player.current.position.y * this.width,
            -1 * (player.current.position.x - 1) * this.height,
          );
        } else {
          totalDistanceMoved = this.distance(
            player.path[player.current.step].x * this.width,
            player.path[player.current.step].y * this.height,
            player.current.position.x * this.width,
            player.current.position.y * this.height,
          );
        }
        if (totalDistanceMoved >= pathDistance || 
            ((player.speed[player.current.step].val === 0) && 
            (player.current.wait >= player.speed[player.current.step].wait))) {
          if (player.current.step < player.path.length - 1) {
            return { 
              step: player.current.step + 1, 
              position: player.path[player.current.step + 1], 
              wait: 0,
            };
          } else {
            return { 
              step: 0, 
              position: player.path[0], 
              wait: 0,
            };
          }
        } else {
          var pxPositionChangeX, pxPositionChangeY;
          var rawX, rawY, x, y;
          if (this.orientation === 'v') {
            pxPositionChangeX = pxPositionChange * Math.sin(angle);
            pxPositionChangeY = pxPositionChange * Math.cos(angle);
            rawX = (player.current.position.x * this.height) + pxPositionChangeX;
            rawY = (player.current.position.y * this.width) + pxPositionChangeY;
            x = rawX / this.height;
            y = rawY / this.width;
            return { 
              step: player.current.step, 
              position: { x: x, y: y },
              wait: player.current.wait + elapsedTime,
            };
          } else {
            pxPositionChangeX = pxPositionChange * Math.cos(angle);
            pxPositionChangeY = pxPositionChange * Math.sin(angle);
            rawX = (player.current.position.x * this.width) + pxPositionChangeX;
            rawY = (player.current.position.y * this.height) + pxPositionChangeY;
            x = rawX / this.width;
            y = rawY / this.height;
            return { 
              step: player.current.step, 
              position: { x: x, y: y },
              wait: player.current.wait + elapsedTime,
            };
          }
        }
      } else {
        return { 
          step: 0, 
          position: player.path[0], 
          wait: 0,
        };
      }
    },
    drawPlayers() {
      for (var i = 0; i < this.players.length; i++) {
        var canvasElement = this.$refs.canvasElement;
        if (canvasElement.getContext) {
          var context = canvasElement.getContext("2d");
          // Draw player circle
          context.beginPath();
          context.fillStyle = this.players[i].color;
          var radius;
          if (this.players[i].team === 'Ball') {
            radius = this.ballRadius;
          } else {
            radius = this.playerRadius;
          }
          if (this.orientation === 'v') {
            context.arc(
              this.players[i].current.position.x * this.height, 
              this.players[i].current.position.y * this.width, 
              radius, 
              0, 
              2 * Math.PI
            );
          } else {
            context.arc(
              this.players[i].current.position.x * this.width, 
              this.players[i].current.position.y * this.height, 
              radius, 
              0, 
              2 * Math.PI
            );
          }
          context.fill();
          context.closePath();
          // Draw player number
          var textColor = this.contrastingColor(this.players[i].color);
          var playerNumberFont = this.playerFontSize.toString(10) + "px sans-serif";
          context.font = playerNumberFont;
          context.fillStyle = textColor;
          if (this.players[i].number.toString(10).length > 1) {
            if (this.orientation === 'v') {
              context.translate(
                this.players[i].current.position.x * this.height, 
                this.players[i].current.position.y * this.width
              );
              context.rotate(Math.PI * 0.5);
              context.fillText(
                this.players[i].number, 
                0 - (this.playerFontSize * 0.575), 
                0 + (this.playerFontSize * 0.375)
              );
              context.rotate(-1 * Math.PI * 0.5);
              context.translate(
                -1 * this.players[i].current.position.x * this.height, 
                -1 * this.players[i].current.position.y * this.width
              );
            } else {
              context.fillText(
                this.players[i].number, 
                (this.players[i].current.position.x * this.width) - (this.playerFontSize * 0.575), 
                (this.players[i].current.position.y * this.height) + (this.playerFontSize * 0.375)
              );
            }
          } else {
            if (this.orientation === 'v') {
              context.translate(
                this.players[i].current.position.x * this.height, 
                this.players[i].current.position.y * this.width
              );
              context.rotate(Math.PI * 0.5);
              context.fillText(
                this.players[i].number, 
                0 - (this.playerFontSize * 0.3), 
                0 + (this.playerFontSize * 0.375)
              );
              context.rotate(-1 * Math.PI * 0.5);
              context.translate(
                -1 * this.players[i].current.position.x * this.height, 
                -1 * this.players[i].current.position.y * this.width
              );
            } else {
              context.fillText(
                this.players[i].number, 
                (this.players[i].current.position.x * this.width) - (this.playerFontSize * 0.3), 
                (this.players[i].current.position.y * this.height) + (this.playerFontSize * 0.375)
              );
            }
          }
        }
      }
    },
    drawPlayerPaths(player) {
      var canvasElement = this.$refs.canvasElement;
      if (canvasElement.getContext) {
        var context = canvasElement.getContext("2d");
        var lineColor = "rgb(0, 0, 0)";
        var lineWidth = 1;
        var lineStyle = "round";
        context.fillStyle = lineColor;
        context.strokeStyle = lineColor;
        context.lineWidth = lineWidth;
        context.lineCap = lineStyle;
        for (var j = 1; j < player.path.length; j++) {
          // Path line
          context.beginPath();
          context.setLineDash([5, 10]);
          if (this.orientation === 'v') {
            context.moveTo(player.path[j - 1].x * this.height, player.path[j - 1].y * this.width);
            context.lineTo(player.path[j].x * this.height, player.path[j].y * this.width);
          } else {
            context.moveTo(player.path[j - 1].x * this.width, player.path[j - 1].y * this.height);
            context.lineTo(player.path[j].x * this.width, player.path[j].y * this.height);
          }
          context.stroke();
          context.closePath();
          // Arrow head
          context.setLineDash([]);
          var angle, distance;
          if (this.orientation === 'v') {
            angle = Math.atan2(
              (player.path[j].y - player.path[j - 1].y) * this.width,
              (player.path[j].x - player.path[j - 1].x) * this.height,
            );
            context.translate(player.path[j].x * this.height, player.path[j].y * this.width);
            distance = this.distance(
              player.path[j].y * this.width,
              -1 * (player.path[j].x - 1) * this.height,
              player.path[j - 1].y * this.width,
              -1 * (player.path[j - 1].x - 1) * this.height,
            );
          } else {
            angle = Math.atan2(
              (player.path[j].y - player.path[j - 1].y) * this.height,
              (player.path[j].x - player.path[j - 1].x) * this.width,
            );
            context.translate(player.path[j].x * this.width, player.path[j].y * this.height);
            distance = this.distance(
              player.path[j].x * this.width,
              player.path[j].y * this.height,
              player.path[j - 1].x * this.width,
              player.path[j - 1].y * this.height,
            );
          }
          var radius = 2;
          if (distance <= (2 * radius)) {
            context.beginPath();
            context.arc(0, 0, radius, 0, 2 * Math.PI);
            context.fill();
            context.closePath();
          } else {
            context.rotate(angle + 10);
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(5, 0);
            context.stroke();
            context.closePath();
            context.rotate(-20)
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(5, 0);
            context.stroke();
            context.closePath();
            context.rotate(-1 * (angle - 10));
          }
          if (this.orientation === 'v') {
            context.translate(-1 * player.path[j].x * this.height, -1 * player.path[j].y * this.width);
          } else {
            context.translate(-1 * player.path[j].x * this.width, -1 * player.path[j].y * this.height);
          }
        }
      }
    },
    contrastingColor(hexColor) {
      var r = hexColor.substring(1, 3);
      var g = hexColor.substring(3, 5);
      var b = hexColor.substring(5, 7);
      var decR = parseInt(r, 16);
      var decG = parseInt(g, 16);
      var decB = parseInt(b, 16);
      if (decR + decG + decB > 382) {
        return '#000000';
      } else {
        return '#ffffff';
      }
    },
    drawSoccerField() {
      var width, height;
      if (this.orientation === 'v') {
        width = this.height;
        height = this.width;
        this.$refs.canvasElement.width = height;
        this.$refs.canvasElement.height = width;
      } else {
        width = this.width;
        height = this.height;
        this.$refs.canvasElement.width = width;
        this.$refs.canvasElement.height = height;
      }
      if (this.$refs.canvasElement.getContext) {
        var context = this.$refs.canvasElement.getContext("2d");
        // Orientation
        if (this.orientation === 'v') {
          context.translate(0, width);
          context.rotate(-1 * Math.PI * 0.5);
        }
        // Constants
        var border = this.widthConversion * 2;
        var surfaceColor = "rgb(75, 140, 20)";
        var lineWidth = 1;
        var lineColor = "rgb(255, 255, 255)";
        var lineStyle = "square";
        var cornerCircleRadius = this.widthConversion * 1;
        var centerCircleRadius = this.widthConversion * 9.15;
        var penaltyDistance = this.widthConversion * 11;
        var penaltyBoxDistance = this.widthConversion * 16.5;
        var halfPenaltyBoxHeight = this.heightConversion * 20.16;
        var sixYardBoxDistance = this.widthConversion * 5.5;
        var halfSixYardBoxHeight = this.heightConversion * 9.16;
        var goalDistance = border * 0.75;
        var halfGoalHeight = this.heightConversion * 3.66;
        // Surface
        context.save();
        context.fillStyle = surfaceColor;
        context.fillRect(0, 0, width, height);
        context.restore();
        context.strokeStyle = lineColor;
        context.lineWidth = lineWidth;
        context.lineCap = lineStyle;
        context.fillStyle = lineColor;
        context.save();
        // Goal lines and touch lines
        context.strokeRect(border, border, width - (2 * border), height - (2 * border));
        // Halfway line
        context.beginPath();
        context.moveTo((width / 2), border);
        context.lineTo((width / 2), height - border);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc((width / 2), (height / 2), lineWidth + 1, 0, (Math.PI * 2));
        context.fill();
        context.closePath();
        // Center circle
        context.beginPath();
        context.arc((width / 2), (height / 2), centerCircleRadius, 0, (Math.PI * 2));
        context.stroke();
        context.closePath();
        // Corner circles
        context.beginPath();
        context.arc(border, border, cornerCircleRadius, 0, (Math.PI * 0.5));
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(width - border, border, cornerCircleRadius, (Math.PI * 0.5), Math.PI);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(width - border, height - border, cornerCircleRadius, Math.PI, (Math.PI * 1.5));
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(border, height - border, cornerCircleRadius, (Math.PI * 1.5), (Math.PI * 2));
        context.stroke();
        context.closePath();
        // Left penalty area
        context.beginPath();
        context.arc(border + penaltyDistance, (height / 2), centerCircleRadius, 0, (Math.PI * 2));
        context.stroke();
        context.closePath();
        context.fillStyle = surfaceColor;
        context.fillRect(border, (height / 2) - halfPenaltyBoxHeight, 
                         penaltyBoxDistance, (2 * halfPenaltyBoxHeight));
        context.strokeRect(border, (height / 2) - halfPenaltyBoxHeight,
                           penaltyBoxDistance, (2 * halfPenaltyBoxHeight));
        context.strokeRect(border, (height / 2) - halfSixYardBoxHeight,
                           sixYardBoxDistance, (2 * halfSixYardBoxHeight));
        // Right penalty area
        context.beginPath();
        context.arc(width - border - penaltyDistance, (height / 2), centerCircleRadius, 0, (Math.PI * 2));
        context.stroke();
        context.closePath();
        context.fillStyle = surfaceColor;
        context.fillRect(width - border - penaltyBoxDistance, (height / 2) - halfPenaltyBoxHeight, 
                         penaltyBoxDistance, (2 * halfPenaltyBoxHeight));
        context.strokeRect(width - border - penaltyBoxDistance, (height / 2) - halfPenaltyBoxHeight, 
                         penaltyBoxDistance, (2 * halfPenaltyBoxHeight));
        context.strokeRect(width - border - sixYardBoxDistance, (height / 2) - halfSixYardBoxHeight, 
                         sixYardBoxDistance, (2 * halfSixYardBoxHeight));
        // Left penalty spot
        context.fillStyle = lineColor;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(border + penaltyDistance , (height / 2));
        context.arc(border + penaltyDistance, (height / 2), lineWidth + 1, 0, (Math.PI * 2));
        context.fill();
        context.closePath();
        context.strokeRect(border - goalDistance, (height / 2) - halfGoalHeight,
                           goalDistance, (2 * halfGoalHeight));
        // Right penalty spot
        context.beginPath();
        context.moveTo(width - border - penaltyDistance, (height / 2));
        context.arc(width - border - penaltyDistance, (height / 2), lineWidth + 1, 0, (Math.PI * 2));
        context.fill();
        context.closePath();
        context.strokeRect(width - border, (height / 2) - halfGoalHeight, 
                           goalDistance, (2 * halfGoalHeight));
      }
    },
    drawBasketballCourt() {
      var width, height;
      if (this.orientation === 'v') {
        width = this.height;
        height = this.width;
        this.$refs.canvasElement.width = height;
        this.$refs.canvasElement.height = width;
      } else {
        width = this.width;
        height = this.height;
        this.$refs.canvasElement.width = width;
        this.$refs.canvasElement.height = height;
      }
      if (this.$refs.canvasElement.getContext) {
        var context = this.$refs.canvasElement.getContext("2d");
        // Orientation
        if (this.orientation === 'v') {
          context.translate(0, width);
          context.rotate(-1 * Math.PI * 0.5);
        }
        // Constants
        var border = this.widthConversion * 0.1;
        var surfaceColor = "rgb(240, 200, 75)";
        var paintColor = "rgb(240, 65, 20)";
        var keyColor = "rgb(20, 85, 240)";
        var lineWidth = 1;
        var lineColor = "rgb(255, 255, 255)";
        var lineStyle = "square";
        var outerHalfCourtCircleRadius = this.widthConversion * 1.8;
        var innerHalfCourtCircleRadius = this.widthConversion * 0.61;
        var threePointCircleRadius = this.widthConversion * 7.24;
        var threePointCornersDistance = this.widthConversion * 4.4;
        var threePointCornersWidth = this.widthConversion * 0.9;
        var paintHalfWidth = this.widthConversion * 2.45;
        var paintLineMarker = this.widthConversion * 0.91;
        var paintDistance = this.widthConversion * 5.8;
        var freeThrowCircleRadius = this.widthConversion * 1.8;
        var basketDistance = this.widthConversion * 1.6;
        var restrictedAreaRadius = this.widthConversion * 1.22;
        var basketRadius = this.widthConversion * 0.2286;
        var backboardDistance = this.widthConversion * 1.22;
        var backboardWidth = this.widthConversion * 1.83;
        var backboardSize = 3;
        var lineMarkerLength = this.widthConversion * 0.3;
        var threePointMarkerDistance = this.widthConversion * 8.53;
        var hashMarker1 = this.widthConversion * 2.13;
        var hashMarker2 = this.widthConversion * 2.43;
        var hashMarker3 = this.widthConversion * 3.34;
        var hashMarker4 = this.widthConversion * 4.25;
        // Surface
        context.save();
        context.fillStyle = surfaceColor;
        context.fillRect(0, 0, width, height);
        context.restore();
        context.strokeStyle = lineColor;
        context.lineWidth = lineWidth;
        context.lineCap = lineStyle;
        context.fillStyle = lineColor;
        context.save();
        // Half-court
        context.beginPath();
        context.moveTo((width / 2), border);
        context.lineTo((width / 2), height - border);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc((width / 2), (height / 2), outerHalfCourtCircleRadius, 0, (Math.PI * 2));
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc((width / 2), (height / 2), innerHalfCourtCircleRadius, 0, (Math.PI * 2));
        context.stroke();
        context.closePath();
        // Left three point line
        context.beginPath();
        context.arc(basketDistance, (height / 2), threePointCircleRadius, (-1 * Math.PI * 0.5), (Math.PI * 0.5));
        context.stroke();
        context.closePath();
        context.fillStyle = surfaceColor;
        context.fillRect((border + 1), (border + 1), 
                         threePointCornersDistance, (height - (2 * border) - 2));
        context.beginPath();
        context.moveTo((border + 1), (border - 1 + threePointCornersWidth));
        context.lineTo((border + 1 + threePointCornersDistance), (border - 1 + threePointCornersWidth));
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo((border + 1), (height - border + 1 - threePointCornersWidth));
        context.lineTo((border + 1 + threePointCornersDistance), (height - border + 1 - threePointCornersWidth));
        context.stroke();
        context.closePath();
        // Right three point line
        context.beginPath();
        context.arc((width - basketDistance), (height / 2), threePointCircleRadius, (Math.PI * 0.5), (Math.PI * 1.5));
        context.stroke();
        context.closePath();
        context.fillStyle = surfaceColor;
        context.fillRect((width - border - 1 - threePointCornersDistance), (border + 1), 
                         threePointCornersDistance, (height - (2 * border) - 2));
        context.beginPath();
        context.moveTo((width - border - 1 - threePointCornersDistance), (border - 1 + threePointCornersWidth));
        context.lineTo((width - border - 1), (border - 1 + threePointCornersWidth));
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo((width - border - 1 - threePointCornersDistance), (height - border + 1 - threePointCornersWidth));
        context.lineTo((width - border - 1), (height - border + 1 - threePointCornersWidth));
        context.stroke();
        context.closePath();
        // Left paint
        context.fillStyle = paintColor;
        context.fillRect((border + 1), (height / 2) - paintHalfWidth,
                         paintDistance, (2 * paintHalfWidth));
        context.strokeRect((border), (height / 2) - paintHalfWidth,
                         (paintDistance + 1), (2 * paintHalfWidth));
        context.fillStyle = keyColor;
        context.fillRect((border + 1), (height / 2) - freeThrowCircleRadius,
                         paintDistance, (2 * freeThrowCircleRadius));
        context.strokeRect((border), (height / 2) - freeThrowCircleRadius,
                         (paintDistance + 1), (2 * freeThrowCircleRadius));
        // Left dashed circle
        context.beginPath();
        context.arc((border + 1 + paintDistance), (height / 2), freeThrowCircleRadius, (-1 * Math.PI * 0.5), (Math.PI * 0.5));
        context.fill();
        context.stroke();
        context.closePath();
        context.setLineDash([5, 25]);
        context.beginPath();
        context.arc((border + 1 + paintDistance), (height / 2), freeThrowCircleRadius, (Math.PI * 0.5), (-1 * Math.PI * 0.5));
        context.stroke();
        context.closePath();
        context.setLineDash([]);
        // Left paint line markers
        context.beginPath();
        context.moveTo(border, (height / 2) - paintHalfWidth - paintLineMarker);
        context.lineTo(border + lineMarkerLength, (height / 2) - paintHalfWidth - paintLineMarker);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(border, (height / 2) + paintHalfWidth + paintLineMarker);
        context.lineTo(border + lineMarkerLength, (height / 2) + paintHalfWidth + paintLineMarker);
        context.stroke();
        context.closePath();
        // Left three point markers
        context.beginPath();
        context.moveTo(border + threePointMarkerDistance, border);
        context.lineTo(border + threePointMarkerDistance, border + (2 * lineMarkerLength));
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(border + threePointMarkerDistance, (height - border));
        context.lineTo(border + threePointMarkerDistance, (height - border) - (2 * lineMarkerLength));
        context.stroke();
        context.closePath();
        // Left hash markers
        context.beginPath();
        context.moveTo(border + hashMarker1, (height / 2) - paintHalfWidth);
        context.lineTo(border + hashMarker1, (height / 2) - paintHalfWidth - (lineMarkerLength));
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(border + hashMarker2, (height / 2) - paintHalfWidth);
        context.lineTo(border + hashMarker2, (height / 2) - paintHalfWidth - (lineMarkerLength));
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(border + hashMarker3, (height / 2) - paintHalfWidth);
        context.lineTo(border + hashMarker3, (height / 2) - paintHalfWidth - (lineMarkerLength));
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(border + hashMarker4, (height / 2) - paintHalfWidth);
        context.lineTo(border + hashMarker4, (height / 2) - paintHalfWidth - (lineMarkerLength));
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(border + hashMarker1, (height / 2) + paintHalfWidth);
        context.lineTo(border + hashMarker1, (height / 2) + paintHalfWidth + (lineMarkerLength));
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(border + hashMarker2, (height / 2) + paintHalfWidth);
        context.lineTo(border + hashMarker2, (height / 2) + paintHalfWidth + (lineMarkerLength));
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(border + hashMarker3, (height / 2) + paintHalfWidth);
        context.lineTo(border + hashMarker3, (height / 2) + paintHalfWidth + (lineMarkerLength));
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(border + hashMarker4, (height / 2) + paintHalfWidth);
        context.lineTo(border + hashMarker4, (height / 2) + paintHalfWidth + (lineMarkerLength));
        context.stroke();
        context.closePath();
        // Left basket
        context.beginPath();
        context.arc((border + 1 + basketDistance), (height / 2), restrictedAreaRadius, (-1 * Math.PI * 0.5), (Math.PI * 0.5));
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc((border + 1 + basketDistance), (height / 2), basketRadius, 0, (Math.PI * 2));
        context.stroke();
        context.closePath();
        context.fillStyle = lineColor;
        context.fillRect((border + 1 + backboardDistance), (height / 2) - (backboardWidth / 2),
                         backboardSize, backboardWidth);
        // Right paint
        context.fillStyle = paintColor;
        context.fillRect((width - border - 1) - paintDistance, (height / 2) - paintHalfWidth,
                         paintDistance, (2 * paintHalfWidth));
        context.strokeRect((width - border - 1) - paintDistance, (height / 2) - paintHalfWidth,
                         (paintDistance + 1), (2 * paintHalfWidth));
        context.fillStyle = keyColor;
        context.fillRect((width - border - 1) - paintDistance, (height / 2) - freeThrowCircleRadius,
                         paintDistance, (2 * freeThrowCircleRadius));
        context.strokeRect((width - border - 1) - paintDistance, (height / 2) - freeThrowCircleRadius,
                         (paintDistance + 1), (2 * freeThrowCircleRadius));
        // Right dashed circle
        context.beginPath();
        context.arc((width - border - 1 - paintDistance), (height / 2), freeThrowCircleRadius, (Math.PI * 0.5), (-1 * Math.PI * 0.5));
        context.fill();
        context.stroke();
        context.closePath();
        context.setLineDash([5, 25]);
        context.beginPath();
        context.arc((width - border - 1) - paintDistance, (height / 2), freeThrowCircleRadius, (-1 * Math.PI * 0.5), (Math.PI * 0.5));
        context.stroke();
        context.closePath();
        context.setLineDash([]);
        // Right paint line markers
        context.beginPath();
        context.moveTo(width - border - 1, (height / 2) - paintHalfWidth - paintLineMarker);
        context.lineTo(width - border - 1 - lineMarkerLength, (height / 2) - paintHalfWidth - paintLineMarker);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(width - border - 1, (height / 2) + paintHalfWidth + paintLineMarker);
        context.lineTo(width - border - 1 - lineMarkerLength, (height / 2) + paintHalfWidth + paintLineMarker);
        context.stroke();
        context.closePath();
        // Right three point markers
        context.beginPath();
        context.moveTo(width - (border + threePointMarkerDistance), border);
        context.lineTo(width - (border + threePointMarkerDistance), border + (2 * lineMarkerLength));
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(width - (border + threePointMarkerDistance), (height - border));
        context.lineTo(width - (border + threePointMarkerDistance), (height - border) - (2 * lineMarkerLength));
        context.stroke();
        context.closePath();
        // Right hash markers
        context.beginPath();
        context.moveTo(width - (border + hashMarker1), (height / 2) - paintHalfWidth);
        context.lineTo(width - (border + hashMarker1), (height / 2) - paintHalfWidth - (lineMarkerLength));
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(width - (border + hashMarker2), (height / 2) - paintHalfWidth);
        context.lineTo(width - (border + hashMarker2), (height / 2) - paintHalfWidth - (lineMarkerLength));
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(width - (border + hashMarker3), (height / 2) - paintHalfWidth);
        context.lineTo(width - (border + hashMarker3), (height / 2) - paintHalfWidth - (lineMarkerLength));
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(width - (border + hashMarker4), (height / 2) - paintHalfWidth);
        context.lineTo(width - (border + hashMarker4), (height / 2) - paintHalfWidth - (lineMarkerLength));
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(width - (border + hashMarker1), (height / 2) + paintHalfWidth);
        context.lineTo(width - (border + hashMarker1), (height / 2) + paintHalfWidth + (lineMarkerLength));
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(width - (border + hashMarker2), (height / 2) + paintHalfWidth);
        context.lineTo(width - (border + hashMarker2), (height / 2) + paintHalfWidth + (lineMarkerLength));
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(width - (border + hashMarker3), (height / 2) + paintHalfWidth);
        context.lineTo(width - (border + hashMarker3), (height / 2) + paintHalfWidth + (lineMarkerLength));
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(width - (border + hashMarker4), (height / 2) + paintHalfWidth);
        context.lineTo(width - (border + hashMarker4), (height / 2) + paintHalfWidth + (lineMarkerLength));
        context.stroke();
        context.closePath();
        // Right basket
        context.beginPath();
        context.arc((width - border - 1) - basketDistance, (height / 2), restrictedAreaRadius, (Math.PI * 0.5), (-1 * Math.PI * 0.5));
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc((width - border - 1) - basketDistance, (height / 2), basketRadius, 0, (Math.PI * 2));
        context.stroke();
        context.closePath();
        context.fillStyle = lineColor;
        context.fillRect((width - border - 1) - backboardDistance - backboardSize, (height / 2) - (backboardWidth / 2),
                         backboardSize, backboardWidth);
        // End lines and side lines 
        context.strokeRect(border, border, width - (2 * border), height - (2 * border));
      }
    },
    drawAmericanFootballField() {
      var width, height;
      if (this.orientation === 'v') {
        width = this.height;
        height = this.width;
        this.$refs.canvasElement.width = height;
        this.$refs.canvasElement.height = width;
      } else {
        width = this.width;
        height = this.height;
        this.$refs.canvasElement.width = width;
        this.$refs.canvasElement.height = height;
      }
      if (this.$refs.canvasElement.getContext) {
        var context = this.$refs.canvasElement.getContext("2d");
        // Orientation
        if (this.orientation === 'v') {
          context.translate(0, width);
          context.rotate(-1 * Math.PI * 0.5);
        }
        // Constants
        var border = this.widthConversion * 0.25;
        var surfaceColor = "rgb(90, 170, 25)";
        var lineWidth = 1;
        var lineColor = "rgb(255, 255, 255)";
        var lineStyle = "square";
        var homeEndZoneColor = "rgb(120, 5, 0)";
        var awayEndZoneColor = "rgb(0, 40, 120)";
        var hashMarkLength = this.widthConversion * 0.6096;
        var hashMarkPadding = hashMarkLength / 2;
        var hashMarkDistance = this.widthConversion * 21.56;
        var halfExtraPointLineLength = this.widthConversion * 0.91;
        var kickoffXLength = this.widthConversion * 0.25;
        var yardNumbering = 0;
        var numberingDistance = this.widthConversion * 5;
        var yardFontSize = this.widthConversion * 3;
        var yardNumberingFont = "bold " + yardFontSize.toString(10) + "px serif";
        var yardDistance = this.widthConversion * 0.5;
        var halfGoalPostDistance = this.widthConversion * 2.82;
        // Surface
        context.fillStyle = surfaceColor;
        context.fillRect(0, 0, width, height);
        // Yard lines
        context.strokeStyle = lineColor;
        context.lineWidth = lineWidth;
        context.lineCap = lineStyle;
        context.fillStyle = lineColor;
        for (var i = 0; i <= 120; i++) {
          var x = (width - (2 * border)) / 120 * i;
          context.beginPath();
          if (i > 10 && i < 110) {
            // 1 yard lines
            context.moveTo(border + x, border + hashMarkPadding);
            context.lineTo(border + x, border + hashMarkPadding + hashMarkLength);
            context.moveTo(border + x, height - border - hashMarkPadding - hashMarkLength);
            context.lineTo(border + x, height - border - hashMarkPadding);
            // Hash marks
            if (i % 5 !== 0) {
              context.moveTo(border + x, border + hashMarkDistance);
              context.lineTo(border + x, border + hashMarkDistance + hashMarkLength);
              context.moveTo(border + x, height - border - hashMarkDistance - hashMarkLength);
              context.lineTo(border + x, height - border - hashMarkDistance);
            } else if (i !== 10 && i % 5 === 0) {
              context.moveTo(border + x - (hashMarkLength / 2), border + hashMarkDistance + hashMarkLength);
              context.lineTo(border + x + (hashMarkLength / 2), border + hashMarkDistance + hashMarkLength);
              context.moveTo(border + x - (hashMarkLength / 2), height - border - hashMarkDistance - hashMarkLength);
              context.lineTo(border + x + (hashMarkLength / 2), height - border - hashMarkDistance - hashMarkLength);
            }
            context.stroke();
            context.closePath();
            // 5 yard lines
            if (i % 5 === 0) {
              context.beginPath();
              context.moveTo(border + x, border);
              context.lineTo(border + x, height - border);
              context.stroke();
              context.closePath();
            }
            // Yard numberings
            if (i >= 20 && i % 10 === 0) {
              context.font = yardNumberingFont;
              if (i < 70) {
                yardNumbering += 10;
              } else if (i >= 70) {
                yardNumbering -= 10;
              }
              context.fillText((yardNumbering / 10).toString(10), x - (yardFontSize / 2), height - border - numberingDistance);
              context.fillText("0", x + yardDistance, height - border - numberingDistance);
              context.save();
              context.translate(width, height / 2);
              context.rotate(Math.PI);
              context.fillText((yardNumbering / 10).toString(10), x - (yardFontSize / 2), (height / 2) - numberingDistance);
              context.fillText("0", x + yardDistance, (height / 2) - numberingDistance);
              context.restore();
            }
          }
          // Extra point lines
          if (i === 12 || i === 108) {
            context.beginPath();
            context.moveTo(border + x, (height / 2) - halfExtraPointLineLength);
            context.lineTo(border + x, (height / 2) + halfExtraPointLineLength);
            context.stroke();
            context.closePath();
          }
          // Kickoff marks
          if (i === 45 || i === 75) {
            context.beginPath();
            context.moveTo(border + x - kickoffXLength, (height / 2) - kickoffXLength);
            context.lineTo(border + x + kickoffXLength, (height / 2) + kickoffXLength);
            context.moveTo(border + x + kickoffXLength, (height / 2) - kickoffXLength);
            context.lineTo(border + x - kickoffXLength, (height / 2) + kickoffXLength);
            context.stroke();
            context.closePath();
          }
          if (i === 10) {
            context.fillStyle = homeEndZoneColor;
            context.fillRect(border, border, x, height - (2 * border));
            context.strokeRect(border, border, x, height - (2 * border));
            context.fillStyle = lineColor;
          }
          if (i === 110) {
            context.fillStyle = awayEndZoneColor;
            context.fillRect(border + x, border, width - (2 * border) - x, height - (2 * border));
            context.strokeRect(border + x, border, width - (2 * border) - x, height - (2 * border));
            context.fillStyle = lineColor;
          }
        }
        // Goal lines and end lines 
        context.strokeRect(border, border, width - (2 * border), height - (2 * border));
        // Goal posts
        context.beginPath();
        context.arc(border, (height / 2) - halfGoalPostDistance, lineWidth + 1, 0, Math.PI * 2);
        context.fill();
        context.closePath();
        context.beginPath();
        context.arc(border, (height / 2) + halfGoalPostDistance, lineWidth + 1, 0, Math.PI * 2);
        context.fill();
        context.closePath();
        context.beginPath();
        context.arc(width - border, (height / 2) - halfGoalPostDistance, lineWidth + 1, 0, Math.PI * 2);
        context.fill();
        context.closePath();
        context.beginPath();
        context.arc(width - border, (height / 2) + halfGoalPostDistance, lineWidth + 1, 0, Math.PI * 2);
        context.fill();
        context.closePath();
      }
    }
  }
}
</script>
