<template>
  <div>
    <h1>小语言图片热区功能</h1>
    <hr>
    <h2>动手试一试</h2>
    <!-- 操作区域 -->
    <hotzone
      :image="image"
      :zonesInit="zones"
      @add="handleAdd"
      @remove="handleRemove"
      @change="handleChange"
    >
    </hotzone>
    <input
      type="text"
      v-for="(zone, index) in zones"
      :key="index"
      v-model="zone.url"
      :placeholder="`Area ${index + 1} url`"
    >
    <!-- 展示区域 -->
    <h2>生成好的图片</h2>
    <div class="wrap">
      <img :src="image" alt="cover">
      <div
        class="zone"
        v-for="(zone, index) in zones"
        :key="index"
        :style="{
          width: getZoneStyle(zone.widthPer),
          height: getZoneStyle(zone.heightPer),
          top: getZoneStyle(zone.topPer),
          left: getZoneStyle(zone.leftPer)
        }"
        @click="handleZoneClick(zone.url)"
      >
      </div>
    </div>
  </div>
</template>

<script>
import hotzone from '@/components/Hotzone'

export default {
  name: 'Index',
  components: {
    hotzone
  },
  data () {
    return {
      image: 'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-697888.jpg',
      zones: [
        {
          heightPer: 0.4374,
          leftPer: 0.1153,
          topPer: 0.238,
          widthPer: 0.2827,
          url: 'https://baidu.com'
        }
      ]
    }
  },
  methods: {
    handleAdd (zone) {
      zone.url = this.zones.length ? '' : 'https://baidu.com'
      this.zones.push(zone)
    },
    handleRemove (index) {
      this.zones.splice(index, 1)
    },
    handleChange () {
      console.log('Zones data update')
    },
    getZoneStyle (val) {
      return `${(val || 0) * 100}%`
    },
    handleZoneClick (url) {
      url && window.open(url)
    }
  }
}
</script>

<style>
#app {
  width: 980px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
}

.wrap {
  position: relative;
}

.wrap img {
  width: 100%;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
}

.wrap .zone {
  position: absolute;
  cursor: pointer;

  border: 1px dashed #eeeeee;
}

input {
  width: 100%;
  box-sizing: border-box;
  margin-top: 20px;
  padding: 10px;

  background: #fff;
  border: 1px solid #ccc;
  outline: none;

  color: #555;

  transition: all 0.30s ease-in-out;
}

input:focus {
  box-shadow: 0 0 5px #43D1AF;
  border: 1px solid #43D1AF;
}
</style>
