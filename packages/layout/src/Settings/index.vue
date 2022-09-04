<template>
  <el-drawer size="280px" :visible="showSettings" :with-header="false" :append-to-body="true" :show-close="false">
    <div class="drawer-container">
      <div>
        <div class="setting-drawer-content">
          <div class="setting-drawer-title">
            <h3 class="drawer-title">主题风格设置</h3>
          </div>
          <div class="setting-drawer-block-checbox">
            <div class="setting-drawer-block-checbox-item" @click="handleSideTheme('theme-dark')">
              <img src="./dark.svg" alt="dark" />
              <div
                v-if="sideTheme === 'theme-dark'"
                class="setting-drawer-block-checbox-selectIcon"
                style="display: block"
              >
                <i aria-label="图标: check" class="anticon anticon-check">
                  <svg
                    viewBox="64 64 896 896"
                    data-icon="check"
                    width="1em"
                    height="1em"
                    :fill="theme"
                    aria-hidden="true"
                    focusable="false"
                    class=""
                  >
                    <path
                      d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
                    />
                  </svg>
                </i>
              </div>
            </div>
            <div class="setting-drawer-block-checbox-item" @click="handleSideTheme('theme-light')">
              <img src="./light.svg" alt="light" />
              <div
                v-if="sideTheme === 'theme-light'"
                class="setting-drawer-block-checbox-selectIcon"
                style="display: block"
              >
                <i aria-label="图标: check" class="anticon anticon-check">
                  <svg
                    viewBox="64 64 896 896"
                    data-icon="check"
                    width="1em"
                    height="1em"
                    :fill="theme"
                    aria-hidden="true"
                    focusable="false"
                    class=""
                  >
                    <path
                      d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
                    />
                  </svg>
                </i>
              </div>
            </div>
          </div>

          <div class="drawer-item">
            <span>主题颜色</span>
            <theme-picker
              :defaultTheme="theme"
              style="float: right; height: 26px; margin: -3px 8px 0 0"
              @change="handleTheme"
            />
          </div>
        </div>

        <el-divider />

        <h3 class="drawer-title">系统布局配置</h3>

        <div class="drawer-item">
          <span>开启 TopNav</span>
          <el-switch :value="topNav" @change="handleTopNav" class="drawer-switch" />
        </div>

        <div class="drawer-item">
          <span>开启 Tags-Views</span>
          <el-switch :value="tagsView" @change="handleTagsView" class="drawer-switch" />
        </div>

        <div class="drawer-item">
          <span>固定 Header</span>
          <el-switch :value="fixedHeader" @change="handleFixedHeader" class="drawer-switch" />
        </div>

        <div class="drawer-item">
          <span>显示 Logo</span>
          <el-switch :value="sidebarLogo" @change="handleSidebarLogo" class="drawer-switch" />
        </div>

        <div class="drawer-item">
          <span>动态标题</span>
          <el-switch :value="dynamicTitle" @change="handleDynamicTitle" class="drawer-switch" />
        </div>

        <el-divider />

        <el-button size="small" type="primary" plain icon="el-icon-document-add" @click="saveSetting"
          >保存配置</el-button
        >
        <el-button size="small" plain icon="el-icon-refresh" @click="resetSetting">重置配置</el-button>
      </div>
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

  .setting-drawer-block-checbox {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 20px;

    .setting-drawer-block-checbox-item {
      position: relative;
      margin-right: 16px;
      border-radius: 2px;
      cursor: pointer;

      img {
        width: 48px;
        height: 48px;
      }

      .setting-drawer-block-checbox-selectIcon {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        padding-top: 15px;
        padding-left: 24px;
        color: #1890ff;
        font-weight: 700;
        font-size: 14px;
      }
    }
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

  .drawer-switch {
    float: right;
  }
}
</style>
