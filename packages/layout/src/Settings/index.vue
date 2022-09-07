<template>
  <el-drawer size="280px" :visible="showSettings" :with-header="false" :append-to-body="true" :show-close="false">
    <div class="drawer-container">
      <h3 class="drawer-title">整体风格设置</h3>
      <div class="drawer-item">
        <el-tooltip effect="dark" content="亮色菜单风格" placement="top">
          <div class="block-checkbox-item block-checkbox-item-light fl" @click="handleSideTheme('theme-light')" />
        </el-tooltip>
        <el-tooltip effect="dark" content="暗色菜单风格" placement="top">
          <div class="block-checkbox-item block-checkbox-item-dark" @click="handleSideTheme('theme-dark')" />
        </el-tooltip>
      </div>

      <h3 class="drawer-title">主题颜色</h3>
      <div class="drawer-item">
        <theme-picker :defaultTheme="theme" @change="handleTheme" />
      </div>

      <h3 class="drawer-title">导航模式</h3>
      <el-tooltip effect="dark" content="侧边菜单布局" placement="top">
        <div class="block-checkbox-item block-checkbox-item-dark fl" @click="handleTopNav(false)" />
      </el-tooltip>
      <el-tooltip effect="dark" content="顶部菜单布局" placement="top">
        <div class="block-checkbox-item block-checkbox-item-top fl" @click="handleTopNav(true)" />
      </el-tooltip>
      <el-tooltip effect="dark" content="混合菜单布局" placement="top">
        <div class="block-checkbox-item block-checkbox-item-mix" />
      </el-tooltip>
      <div class="drawer-item">
        <span>固定 Header</span>
        <el-switch :value="fixedHeader" @change="handleFixedHeader" class="fr" />
      </div>
      <div class="drawer-item">
        <span>开启 Tags-Views</span>
        <el-switch :value="tagsView" @change="handleTagsView" class="fr" />
      </div>

      <h3 class="drawer-title">内容区域</h3>
      <div class="drawer-item">
        <span>显示 Logo</span>
        <el-switch :value="sidebarLogo" @change="handleSidebarLogo" class="fr" />
      </div>
      <div class="drawer-item">
        <span>动态标题</span>
        <el-switch :value="dynamicTitle" @change="handleDynamicTitle" class="fr" />
      </div>

      <el-divider />
      <el-button size="small" type="primary" plain icon="el-icon-document-add" @click="saveSetting">保存配置</el-button>
      <el-button size="small" plain icon="el-icon-refresh" @click="resetSetting">重置配置</el-button>
    </div>
  </el-drawer>
</template>

<script>
import { Loading } from 'element-ui';
import ThemePicker from '../ThemePicker';

export default {
  name: 'LayoutSettings',
  components: { ThemePicker },
  props: {
    showSettings: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: '#409EFF',
    },
    sideTheme: {
      type: String,
      default: 'theme-dark',
    },
    topNav: {
      type: Boolean,
      default: false,
    },
    tagsView: {
      type: Boolean,
      default: false,
    },
    fixedHeader: {
      type: Boolean,
      default: false,
    },
    sidebarLogo: {
      type: Boolean,
      default: false,
    },
    dynamicTitle: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleTheme(val) {
      this.$emit('changeSetting', {
        key: 'theme',
        value: val,
      });
    },
    handleSideTheme(val) {
      this.$emit('changeSetting', {
        key: 'sideTheme',
        value: val,
      });
    },
    handleTopNav(val) {
      this.$emit('changeSetting', {
        key: 'topNav',
        value: val,
      });
      if (!val) {
        this.$emit('toggleSidebarHide', false);
        this.$emit('resetSidebarRoutes');
      }
    },
    handleTagsView(val) {
      this.$emit('changeSetting', {
        key: 'needTagsView',
        value: val,
      });
    },
    handleFixedHeader(val) {
      this.$emit('changeSetting', {
        key: 'fixedHeader',
        value: val,
      });
    },
    handleSidebarLogo(val) {
      this.$emit('changeSetting', {
        key: 'sidebarLogo',
        value: val,
      });
    },
    handleDynamicTitle(val) {
      this.$emit('changeSetting', {
        key: 'dynamicTitle',
        value: val,
      });
    },
    saveSetting() {
      const loadingInstance = Loading.service({
        lock: true,
        text: '正在保存到本地，请稍候...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      localStorage.setItem(
        'layout-setting',
        `{
            "topNav":${this.topNav},
            "tagsView":${this.tagsView},
            "fixedHeader":${this.fixedHeader},
            "sidebarLogo":${this.sidebarLogo},
            "dynamicTitle":${this.dynamicTitle},
            "sideTheme":"${this.sideTheme}",
            "theme":"${this.theme}"
          }`,
      );
      setTimeout(loadingInstance.close(), 1000);
    },
    resetSetting() {
      Loading.service({
        lock: true,
        text: '正在清除设置缓存并刷新，请稍候...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      localStorage.removeItem('layout-setting');
      setTimeout(() => window.location.reload(), 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.setting-drawer-content {
  .setting-drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
    font-weight: bold;
  }
}

.drawer-container {
  padding: 20px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .fr {
    float: right;
  }

  .fl {
    float: left;
  }
}

.block-checkbox-item {
  position: relative;
  width: 44px;
  height: 36px;
  margin-right: 16px;
  overflow: hidden;
  background-color: #f0f2f5;
  border-radius: 4px;
  box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);
  cursor: pointer;

  &-light:before {
    background-color: #fff;
    content: '';
  }
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 33%;
    height: 100%;
    background-color: #fff;
    content: '';
  }

  &-light:after {
    background-color: #fff;
  }
  &:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 25%;
    background-color: #fff;
    content: '';
  }

  &-dark:before,
  &-side:before {
    z-index: 1;
    background-color: #001529;
    content: '';
  }

  &-dark:after,
  &-side:after {
    background-color: #fff;
  }

  &-top:before {
    background-color: transparent;
    content: '';
  }
  &-top:after {
    background-color: #001529;
  }

  &-mix:before {
    background-color: #fff;
    content: '';
  }
  &-mix:after {
    background-color: #001529;
  }
}
</style>
