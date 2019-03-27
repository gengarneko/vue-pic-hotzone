<template>
  <li
    v-drag-item
    :style="{
      top: zoneTop,
      left: zoneLeft,
      width: zoneWidth,
      height: zoneHeight
    }"
  >
    <ul
      v-change-size
      class="hz-m-box"
      :class="{
        'hz-z-hidden': tooSmall,
        'hz-m-hoverbox': !hideZone
      }"
    >
      <li class="hz-u-index" :title="`热区${index + 1}`">{{ index + 1 }}</li>

    </ul>
  </li>
</template>

<script>
export default {
  name: 'Zone',
  data () {
    return {
      zones: []
    }
  }
}
</script>
