<template>
  <div class="notification is-danger">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: [
    'message',
  ],
}
</script>

<style>
  .notification {
    margin-bottom: 20px;
  }
  .is-danger {
    color: #bb2d4f
  }
</style>
