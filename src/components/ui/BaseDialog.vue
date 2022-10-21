<template>
  <div>
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <header>
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>
        <section>
          <slot></slot>
        </section>
        <menu v-if="!fixed">
          <slot name="actions">
            <base-button @click.native="tryClose">Close</base-button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["close"],
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      this.$emit("close");
    },
  },
};
</script>

<style lang="less" scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
  backdrop-filter: blur(4px);
}
dialog {
  position: fixed;
  top: 20vh;
  margin: 0 auto;
  max-width: 50rem;
  width: 90%;
  z-index: 100;
  overflow: hidden;
  border-radius: 1.2rem;
  border: none;
  padding: 0;
}
header {
  display: flex;
  background: purple;
  padding: 1.6rem;
  h2 {
    color: white;
  }
}
section {
  padding: 1.6rem;
  margin: 0;
  margin-top: 1.6rem;
}
menu {
  padding: 1.6rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

.dialog-enter,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}
.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave {
  opacity: 1;
  transform: scale(1);
}

@media (min-width: 768px) {
  dialog {
    left: calc(50%-20rem);
    width: 40rem;
  }
}
</style>
