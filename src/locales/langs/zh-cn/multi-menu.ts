const multiMenu = {
  title: '多级菜单',
  description: '这是一个多级菜单的示例页面',
  menuOne: {
    title: '菜单一',
    description: '这是第一个多级菜单',
    first: {
      title: '一级菜单',
      description: '一级菜单页面',
      child: {
        title: '二级菜单',
        description: '二级菜单页面',
        home: {
          title: '二级菜单首页',
          description: '欢迎来到二级菜单首页',
          content: '这里展示了多级菜单的层级结构'
        }
      }
    }
  },
  menuTwo: {
    title: '菜单二',
    description: '这是第二个多级菜单',
    first: {
      title: '一级菜单',
      description: '一级菜单页面',
      child: {
        title: '二级菜单',
        description: '二级菜单页面',
        home: {
          title: '二级菜单首页',
          description: '欢迎来到二级菜单首页',
          content: '这里展示了多级菜单的层级结构'
        }
      }
    }
  },
  navigation: {
    backToMenuOne: '返回菜单一',
    backToMenuTwo: '返回菜单二',
    backToRoot: '返回根菜单'
  },
  features: {
    breadcrumb: '面包屑导航',
    tabNavigation: '标签页导航',
    menuHighlight: '菜单高亮',
    routeParams: '路由参数',
    menuStructure: '菜单结构说明',
    menuOneDesc: '菜单一：包含一级、二级等子菜单',
    menuTwoDesc: '菜单二：包含一级、二级等子菜单'
  }
};

export default multiMenu; 