const page = {
  about: {
    devDep: '开发依赖',
    introduction: 'ChikoAdmin 是一个优雅且功能强大的后台管理模板，基于最新的前端技术栈，包括 React19.0, Vite6, TypeScript, ReactRouter7, Redux/toolkit 和 UnoCSS。它内置了丰富的主题配置和组件，代码规范严谨，实现了自动化的文件路由系统。此外，它还采用了基于 MSW (Mock Service Worker) 的本地 Mock 数据方案，支持离线开发。ChikoAdmin 为您提供了一站式的后台管理解决方案，无需额外配置，开箱即用。同样是一个快速学习前沿技术的最佳实践。',
    prdDep: '生产依赖',
    projectInfo: {
      githubLink: 'Github 地址',
      latestBuildTime: '最新构建时间',
      previewLink: '预览地址',
      title: '项目信息',
      version: '版本'
    },
    title: '关于'
  },
  function: {
    multiTab: {
      backTab: '返回 function_tab',
      routeParam: '路由参数'
    },
    request: {
      repeatedError: '重复请求错误',
      repeatedErrorMsg1: '自定义请求错误 1',
      repeatedErrorMsg2: '自定义请求错误 2',
      repeatedErrorOccurOnce: '重复请求错误只出现一次'
    },
    tab: {
      tabOperate: {
        addMultiTab: '添加多标签页',
        addMultiTabDesc1: '跳转到多标签页页面',
        addMultiTabDesc2: '跳转到多标签页页面(带有查询参数)',
        addTab: '添加标签页',
        addTabDesc: '跳转到关于页面',
        closeAboutTab: '关闭"关于"标签页',
        closeCurrentTab: '关闭当前标签页',
        closeTab: '关闭标签页',
        title: '标签页操作'
      },
      tabTitle: {
        change: '修改',
        changeTitle: '修改标题',
        reset: '重置',
        resetTitle: '重置标题',
        title: '标签页标题'
      }
    },
    toggleAuth: {
      adminOrUserVisible: '管理员和用户可见',
      adminVisible: '管理员可见',
      authHook: '权限钩子函数 `hasAuth`',
      superAdminVisible: '超级管理员可见',
      toggleAccount: '切换账号'
    }
  },
  home: {
    creativity: '创意',
    dealCount: '成交量',
    downloadCount: '下载量',
    entertainment: '娱乐',
    greeting: '你好呀，{{userName}}, 今天又是充满活力的一天!',
    message: '消息',
    projectCount: '项目数',
    projectNews: {},
    registerCount: '注册量',
    rest: '休息',
    schedule: '作息安排',
    study: '学习',
    todo: '待办',
    turnover: '成交额',
    visitCount: '访问量',
    weatherDesc: '今日多云转晴，20℃ - 25℃!',
    work: '工作',
    newProject: '新建项目',
    fromLastMonth: '较上月',
    recentActivity: '最近活动',
    salesData: '销售数据',
    userGrowth: '用户增长',
    salesAnalysis: '销售分析',
    productAnalysis: '产品分析',
    productDistribution: '产品分布',
    technology: '技术部门',
    marketing: '市场部门',
    operations: '运营部门',
    finance: '财务部门',
    dashboardOverview: '仪表盘概览',
    refresh: '刷新',
    today: '今日',
    thisWeek: '本周',
    thisMonth: '本月',
    aboutSection: {
      title: '关于',
      description: '现代化的 React 管理系统模板'
    },
    activity: {
      deploy: '项目部署',
      deployDesc: '成功部署了最新版本到生产环境',
      update: '系统更新',
      updateDesc: '系统已更新到最新版本',
      alert: '系统警告',
      alertDesc: '服务器负载过高，请注意',
      error: '系统错误',
      errorDesc: '数据库连接失败，请检查配置'
    }
  },
  login: {
    bindWeChat: {
      title: '绑定微信'
    },
    codeLogin: {
      getCode: '获取验证码',
      imageCodePlaceholder: '请输入图片验证码',
      reGetCode: '{{time}}秒后重新获取',
      sendCodeSuccess: '验证码发送成功',
      title: '验证码登录'
    },
    common: {
      back: '返回',
      codeLogin: '验证码登录',
      codePlaceholder: '请输入验证码',
      confirm: '确定',
      confirmPasswordPlaceholder: '请再次输入密码',
      loginOrRegister: '登录 / 注册',
      loginSuccess: '登录成功',
      passwordPlaceholder: '请输入密码',
      phonePlaceholder: '请输入手机号',
      userNamePlaceholder: '请输入用户名',
      validateSuccess: '验证成功',
      welcomeBack: '欢迎回来，{{userName}} ！'
    },
    pwdLogin: {
      admin: '管理员',
      forgetPassword: '忘记密码？',
      otherAccountLogin: '其他账号登录',
      otherLoginMode: '其他登录方式',
      register: '注册账号',
      rememberMe: '记住我',
      superAdmin: '超级管理员',
      title: '密码登录',
      user: '普通用户'
    },
    register: {
      agreement: '我已经仔细阅读并接受',
      policy: '《隐私权政策》',
      protocol: '《用户协议》',
      title: '注册账号'
    },
    resetPwd: {
      title: '重置密码'
    }
  },
  multiMenu: {
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
            content: '这展示了多级菜单的层次结构'
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
            content: '这展示了多级菜单的层次结构'
          }
        }
      }
    },
    navigation: {
      backToMenuOne: '返回菜单一',
      backToMenuTwo: '返回菜单二',
      backToRoot: '返回根菜单'
    },
    pageContent: '页面内容',
    currentPath: '当前路径',
    menuLevel: '菜单层级',
    menuOneToFirst: '菜单一 → 一级菜单 → 二级菜单 → 二级菜单首页',
    menuTwoToFirst: '菜单二 → 一级菜单 → 二级菜单',
    pageTitles: {
      menuOneChild: '菜单一展示页面',
      menuOneChildDesc: '这是菜单一的一级菜单下的展示页面',
      menuTwoChildHome: '菜单二展示页面',
      menuTwoChildHomeDesc: '这是菜单二的二级菜单下的展示页面'
    },
    menuLevels: {
      multiMenu: '多级菜单',
      menuOne: '菜单一',
      menuTwo: '菜单二',
      firstLevel: '一级菜单',
      secondLevel: '二级菜单',
      home: '首页'
    },
    features: {
      title: '功能特性',
      breadcrumb: '面包屑导航',
      tabNavigation: '标签页导航',
      menuHighlight: '菜单高亮',
      routeParams: '路由参数',
      menuStructure: '菜单结构说明',
      menuOneDesc: '菜单一：包含一级、二级等',
      menuTwoDesc: '菜单二：包含一级、二级等'
    },
    statistics: {
      title: '页面统计',
      visits: '访问次数',
      duration: '停留时长',
      bounceRate: '跳出率',
      conversionRate: '转化率'
    },
    quickActions: {
      title: '快捷操作',
      refresh: '刷新页面',
      export: '导出数据',
      print: '打印页面',
      share: '分享页面'
    },
    systemInfo: {
      title: '系统信息',
      version: '版本号',
      buildTime: '构建时间',
      environment: '运行环境',
      lastUpdate: '最后更新'
    }
  },
  manage: {
    common: {
      status: {
        disable: '禁用',
        enable: '启用'
      }
    },
    menu: {
      activeMenu: '高亮的菜单',
      addChildMenu: '新增子菜单',
      addMenu: '新增菜单',
      button: '按钮',
      buttonCode: '按钮编码',
      buttonDesc: '按钮描述',
      constant: '常量路由',
      editMenu: '编辑菜单',
      fixedIndexInTab: '固定在页签中的序号',
      form: {
        activeMenu: '请选择高亮的菜单的路由名称',
        button: '请选择是否按钮',
        buttonCode: '请输入按钮编码',
        buttonDesc: '请输入按钮描述',
        fixedIndexInTab: '请输入固定在页签中的序号',
        fixedInTab: '请选择是否固定在页签中',
        hideInMenu: '请选择是否隐藏菜单',
        home: '请选择首页',
        href: '请输入外链',
        i18nKey: '请输入国际化key',
        icon: '请输入图标',
        keepAlive: '请选择是否缓存路由',
        layout: '请选择布局组件',
        localIcon: '请选择本地图标',
        menuName: '请输入菜单名称',
        menuStatus: '请选择菜单状态',
        menuType: '请选择菜单类型',
        multiTab: '请选择是否支持多标签',
        order: '请输入排序',
        page: '请选择页面组件',
        parent: '请选择父级菜单',
        pathParam: '请输入路径参数',
        queryKey: '请输入路由参数Key',
        queryValue: '请输入路由参数Value',
        routeName: '请输入路由名称',
        routePath: '请输入路由路径'
      },
      hideInMenu: '隐藏菜单',
      home: '首页',
      href: '外链',
      i18nKey: '国际化key',
      icon: '图标',
      iconType: {
        iconify: 'iconify图标',
        local: '本地图标'
      },
      iconTypeTitle: '图标类型',
      id: 'ID',
      keepAlive: '缓存路由',
      layout: '布局',
      localIcon: '本地图标',
      menuName: '菜单名称',
      menuStatus: '菜单状态',
      menuType: '菜单类型',
      multiTab: '支持多页签',
      order: '排序',
      page: '页面组件',
      parent: '父级菜单',
      parentId: '父级菜单ID',
      pathParam: '路径参数',
      query: '路由参数',
      routeName: '路由名称',
      routePath: '路由路径',
      title: '菜单列表',
      type: {
        directory: '目录',
        menu: '菜单'
      }
    },
    role: {
      addRole: '新增角色',
      buttonAuth: '按钮权限',
      editRole: '编辑角色',
      form: {
        roleCode: '请输入角色编码',
        roleDesc: '请输入角色描述',
        roleName: '请输入角色名称',
        roleStatus: '请选择角色状态'
      },
      menuAuth: '菜单权限',
      roleCode: '角色编码',
      roleDesc: '角色描述',
      roleName: '角色名称',
      roleStatus: '角色状态',
      title: '角色列表'
    },
    roleDetail: {
      content: '这个页面仅仅是为了展示匹配到所有多级动态路由',
      explain:
        '[...slug] 是匹配所有多级动态路由的语法 以[...any]为格式,匹配到的数据会在useRoute的params中以数组的形式存在'
    },
    user: {
      addUser: '新增用户',
      editUser: '编辑用户',
      form: {
        nickName: '请输入昵称',
        userEmail: '请输入邮箱',
        userGender: '请选择性别',
        userName: '请输入用户名',
        userPhone: '请输入手机号',
        userRole: '请选择用户角色',
        userStatus: '请选择用户状态'
      },
      gender: {
        female: '女',
        male: '男'
      },
      nickName: '昵称',
      title: '用户列表',
      userEmail: '邮箱',
      userGender: '性别',
      userName: '用户名',
      userPhone: '手机号',
      userRole: '用户角色',
      userStatus: '用户状态'
    },
    userDetail: {
      content: `loader 会让网络请求跟懒加载的文件几乎一起发出请求 然后 一边解析懒加载的文件 一边去等待 网络请求
        待到网络请求完成页面 一起显示 配合react的fiber架构 可以做到 用户如果嫌弃等待时间较长 在等待期间用户可以去
        切换不同的页面 这是react 框架和react-router数据路由器的优势 而不用非得等到 页面的显现 而不是常规的
        请求懒加载的文件 - 解析 - 请求懒加载的文件 - 挂载之后去发出网络请求 - 然后渲染页面 - 渲染完成
        还要自己加loading效果`,
      explain: '这个页面仅仅是为了展示 react-router-dom 的 loader 的强大能力，数据是随机的对不上很正常'
    }
  },
  userCenter: {
    description: '管理您的个人信息和账户设置',
    rolePermissions: '角色权限信息',
    accountStats: '账户统计',
    quickActions: '快速操作',
    status: {
      employed: '在职',
      online: '在线'
    },
    joinDate: '入职时间',
    lastLogin: '最后登录',
    permissionList: '权限列表',
    loginCount: '登录次数',
    onlineTime: '在线时长',
    operationCount: '操作次数',
    actions: {
      editProfile: '编辑个人信息',
      changePassword: '修改密码',
      messageSettings: '消息设置',
      exportData: '导出数据'
    },
    roles: {
      superAdmin: '超级管理员',
      superAdminDesc: '拥有系统所有权限，可以管理所有功能和用户',
      admin: '管理员',
      adminDesc: '拥有大部分管理权限，可以管理用户和基础功能',
      user: '普通用户',
      userDesc: '基础功能使用权限',
      customRole: '自定义角色'
    },
    permissions: {
      userManagement: '用户管理',
      roleManagement: '角色管理',
      systemConfig: '系统配置',
      dataManagement: '数据管理',
      logView: '日志查看',
      dataView: '数据查看',
      personalSettings: '个人设置',
      basicPermission: '基础权限'
    }
  }
};

export default page;
