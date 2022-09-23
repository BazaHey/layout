<template>
  <div>
    <el-menu
      class="topmenu-container"
      :default-active="activeMenu"
      :background-color="theme"
      :text-color="textColor"
      mode="horizontal"
      @select="handleSelect"
    >
      <template v-for="(item, index) in mixMenus">
        <el-menu-item v-if="index < visibleNumber" :key="index" :index="item.path" :style="{ '--theme': theme }">
          <div class="box">
            <svg-icon :icon-class="item?.meta?.icon || ''" class-name="icon" />
            <span class="title">{{ item?.meta?.title }}</span>
          </div>
        </el-menu-item>
      </template>

      <!-- 顶部菜单超出数量折叠 -->
      <el-submenu
        v-if="mixMenus.length > visibleNumber"
        :style="{ '--theme': theme, lineHeight: '80px', height: '80px' }"
        index="more"
      >
        <template slot="title">
          <div class="box">
            <svg-icon icon-class="filling-rules" class-name="icon" />
            <span class="title">更多菜单</span>
          </div>
        </template>
        <template v-for="(item, index) in mixMenus">
          <el-menu-item v-if="index >= visibleNumber" :key="index" :index="item.path">
            <svg-icon :icon-class="item?.meta?.icon || ''" />
            {{ item?.meta?.title }}
          </el-menu-item>
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { getGrayReversedColor } from '../utils';
// 隐藏侧边栏路由
const hideList = ['/index', '/user/profile'];

export default {
  name: 'MixNav',
  props: {
    theme: {
      type: String,
      default: '#409EFF',
    },
    menuRoutes: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // 顶部栏初始数
      visibleNumber: 5,
      // 当前激活菜单的 index
      currentIndex: undefined,
    };
  },
  computed: {
    textColor() {
      return getGrayReversedColor(this.theme);
    },
    // 顶部显示菜单
    mixMenus() {
      const mixMenus = [];
      this.menuRoutes.forEach((menu) => {
        if (menu.hidden !== true) {
          // 兼容顶部栏一级菜单内部跳转
          if (menu.path === '/') {
            mixMenus.push(menu.children[0]);
          } else {
            mixMenus.push(menu);
          }
        }
      });
      return mixMenus;
    },
    // 设置子路由
    childrenMenus() {
      const childrenMenus = [];
      this.menuRoutes.map((router) => {
        for (const item in router.children) {
          if (router.children[item].parentPath === undefined) {
            if (router.path === '/') {
              router.children[item].path = '/' + router.children[item].path;
            } else {
              if (!this.ishttp(router.children[item].path)) {
                router.children[item].path = router.path + '/' + router.children[item].path;
              }
            }
            router.children[item].parentPath = router.path;
          }
          childrenMenus.push(router.children[item]);
        }
        return undefined;
      });
      return childrenMenus;
    },
    // 默认激活的菜单
    activeMenu() {
      const path = this.$route.path;
      let activePath = path;
      if (path !== undefined && path.lastIndexOf('/') > 0 && hideList.indexOf(path) === -1) {
        const tmpPath = path.substring(1, path.length);
        activePath = '/' + tmpPath.substring(0, tmpPath.indexOf('/'));
      } else if (!this.children) {
        activePath = path;
      }
      this.activeRoutes(activePath);
      return activePath;
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.setVisibleNumber);
  },
  mounted() {
    this.setVisibleNumber();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setVisibleNumber);
  },
  methods: {
    // 根据宽度计算设置显示栏数
    setVisibleNumber() {
      const width = document.body.getBoundingClientRect().width / 3;
      this.visibleNumber = parseInt(width / 85);
    },
    // 菜单选择事件
    handleSelect(key, keyPath) {
      this.currentIndex = key;
      const route = this.menuRoutes.find((item) => item.path === key);
      if (this.ishttp(key)) {
        // http(s):// 路径新窗口打开
        window.open(key, '_blank');
      } else if (!route || !route.children) {
        // 没有子路由路径内部打开
        this.$router.push({ path: key });
      } else {
        // 显示左侧联动菜单
        this.activeRoutes(key);
      }
    },
    // 当前激活的路由
    activeRoutes(key) {
      const routes = [];
      if (this.childrenMenus && this.childrenMenus.length > 0) {
        this.childrenMenus.map((item) => {
          if (key === item.parentPath || (key === 'index' && item.path === '')) {
            routes.push(item);
          }
          return undefined;
        });
      }
      if (routes.length > 0) {
        this.$emit('setSidebarRoutes', routes);
      }
      return routes;
    },
    ishttp(url) {
      return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1;
    },
  },
};
</script>

<style lang="scss">
.box {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 53px;
  .icon {
    color: rgb(255, 255, 255);
    font-size: 24px;
  }
  .title {
    line-height: 20px;
    font-size: 14px !important;
    display: inline-block;
    margin-top: 8px;
  }
}

.topmenu-container.el-menu--horizontal > .el-menu-item,
.topmenu-container.el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 80px;
  line-height: 80px;
}

.topmenu-container.el-menu--horizontal > .el-menu-item.is-active,
.el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  color: #fff;
  background: hsla(0, 0%, 100%, 0.247) !important;
  border-bottom: 4px solid #fff !important;
  // border-bottom: 2px solid #{'var(--theme)'} !important;
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 0;
    height: 0;
    margin: auto;
    border-width: 8px;
    border-style: solid;
    border-color: transparent #fff transparent transparent;
    transform: rotate(90deg);
  }
}
</style>
