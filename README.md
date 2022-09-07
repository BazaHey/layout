# 布局

### 依赖

Vue 2.6.14+

Vue-Router 3.5.4+

Element-UI 2.15.8+

### 安装

```
npm install @thtf/prolayout
```

### 属性

| 参数       | 说明                     | 类型   | 可选值 | 默认值 |
| ---------- | ------------------------ | ------ | ------ | ------ |
| logoTitle  | layout 的左上角 的 title | String | -      | -      |
| menuRoutes | 路由数组                 | Array  | -      | -      |
| settings   | 布局配置                 | Object | -      | -      |

### menuRoutes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ------ | ------ |

### settings

| 参数         | 说明                 | 类型    | 可选值                   | 默认值     |
| ------------ | -------------------- | ------- | ------------------------ | ---------- |
| title        |                      |         |                          |            |
| theme        | 主题色               | String  | -                        | #409eff    |
| sideTheme    | 菜单栏模式           | String  | theme-dark, theme-lingth | theme-dark |
| showSettings | 是否显示配置         | Boolean | true, false              | false      |
| topNav       | 是否菜单顶部导航布局 | Boolean | true, false              | false      |
| togsView     | 是否启用页签         | Boolean | true,false               | false      |
| fixedHeader  | 是否固定顶部导航     | Boolean | true,false               | false      |
| sidebarLogo  | 是否显示 Logo        | Boolean | true,false               | false      |
| dynamicTitle | 是否启用动态标签功能 | Boolean | true,false               | false      |

### 插槽

| 名称      | 说明                 |
| --------- | -------------------- |
| logo      | layout 的左上角 logo            |
| rightMenu | 导航栏最右侧菜单区域 |
