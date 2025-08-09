const multiMenu = {
  title: 'Multi-level Menu',
  description: 'This is an example page for multi-level menu',
  menuOne: {
    title: 'Menu One',
    description: 'This is the first multi-level menu',
    first: {
      title: 'First Level Menu',
      description: 'First level menu page',
      child: {
        title: 'Second Level Menu',
        description: 'Second level menu page',
        home: {
          title: 'Second Level Home',
          description: 'Welcome to the second level home page',
          content: 'This demonstrates the hierarchical structure of multi-level menus'
        }
      }
    }
  },
  menuTwo: {
    title: 'Menu Two',
    description: 'This is the second multi-level menu',
    first: {
      title: 'First Level Menu',
      description: 'First level menu page',
      child: {
        title: 'Second Level Menu',
        description: 'Second level menu page',
        home: {
          title: 'Second Level Home',
          description: 'Welcome to the second level home page',
          content: 'This demonstrates the hierarchical structure of multi-level menus'
        }
      }
    }
  },
  navigation: {
    backToMenuOne: 'Back to Menu One',
    backToMenuTwo: 'Back to Menu Two',
    backToRoot: 'Back to Root Menu'
  },
  features: {
    breadcrumb: 'Breadcrumb Navigation',
    tabNavigation: 'Tab Navigation',
    menuHighlight: 'Menu Highlight',
    routeParams: 'Route Parameters',
    menuStructure: 'Menu Structure Description',
    menuOneDesc: 'Menu One: Contains first level, second level, etc.',
    menuTwoDesc: 'Menu Two: Contains first level, second level, etc.'
  }
};

export default multiMenu; 