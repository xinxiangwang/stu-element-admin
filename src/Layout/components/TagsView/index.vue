<template>
  <div class="tags-view-container">
    <router-link
      v-for="view in visitedViews"
      :key="view.path"
      ref="tag"
      tag="span"
      class="tags-view-item"
      :class="isActive(view) ? 'active' : ''"
      :to="{ path: view.path, qeury: view.query, fullPath: view.fullPath }"
      @contextmenu.prevent.native="openMenu(view, $event)"
    >
      {{ view.title }}
      <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(view)" />
    </router-link>
    <ul v-show="visible" class="contextmenu" :style="{ left: left + 'px', top: top + 'px' }">
      <li @click="refreshSelectTag(selectedTag)">刷新</li>
      <li @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeNoSelectedTag(selectedTag)">关闭其他</li>
      <li>关闭所有</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      left: '',
      top: '',
      visible: false,
      selectedTag: null
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    }
  },
  watch: {
    $route() {
      this.addTags()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  methods: {
    isActive(view) {
      return view.path === this.$route.path
    },
    addTags() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
      }
      return false
    },
    closeSelectedTag(view) {
      this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    closeNoSelectedTag(view) {
      this.$store.dispatch('tagsView/delOtherView', view).then(({ visitedViews }) => {
        console.log(visitedViews)
        if (visitedViews.length > 0) {
          const { fullPath, query } = visitedViews[0]
          this.$router.push({ path: fullPath, query })
        }
      })
    },
    toLastView(visitedViews, view) {
      const lastView = visitedViews.slice(-1)[0]
      if (lastView) {
        console.log('123')
        this.$router.push(lastView.fullPath)
      } else {
        console.log('zzz')
        this.$router.push('/')
      }
    },
    initTags() {

    },
    openMenu(view, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left
      const offsetWidth = this.$el.offsetWidth
      const maxLeft = offsetWidth - menuMinWidth
      const left = e.clientX - offsetLeft + 15

      this.left = left > maxLeft ? maxLeft : left

      this.top = e.clientY
      this.visible = true
      this.selectedTag = view
    },
    refreshSelectTag(view) {
      const { fullPath } = view
      this.$router.replace({
        path: '/redirect' + fullPath
      })
    },
    closeMenu() {
      this.visible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      background-color: #42b983;
      color: #fff;
      border-color: #42b983;
    }
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}

</style>
