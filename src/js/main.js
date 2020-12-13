const dom = {
  burger: document.querySelector('.burger'),
  body: document.querySelector('body'),
  menu: document.querySelector('.menu'),
  page: document.querySelector('.page'),
  menuArrows: {
    firstLvl: document.querySelectorAll('.menu__arrow'),
    secondLvl: document.querySelectorAll('.menu__subarrow'),
  },
  menuLists: {
    secondLvl: document.querySelectorAll('.menu__sublist'),
    thirdLvl: document.querySelectorAll('.menu__sub-sublist'),
  },
  menuItems: {
    firstLvl: document.querySelectorAll('.menu__item'),
    secondLvl: document.querySelectorAll('.menu__subitem'),
  },
};

const modificators = {
  burgerActive: 'burger--active',
  menuBurger: 'menu--burger',
  arrowActive: 'icon--active',
  blackout: 'page--blackout',
  scrollHidden: 'scroll-hidden'
};

const extraClasses = {
  opened: 'opened',
  touch: 'touch',
};

const commonArguments = {
  burger: dom.burger,
  menu: dom.menu,
  page: dom.page,
  body: dom.body
};

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const toggleBurgerClasses = (args) => {
  args.burger.addEventListener('click', () => {
    args.burger.classList.toggle(modificators.burgerActive);
    args.menu.classList.toggle(modificators.menuBurger);
    args.page.classList.toggle(modificators.blackout);
    args.body.classList.toggle(modificators.scrollHidden);
  });
};

const removeBurgerClasses = (args) => {
  args.burger.classList.remove(modificators.burgerActive);
  args.menu.classList.remove(modificators.menuBurger);
  args.page.classList.remove(modificators.blackout);
  args.body.classList.remove(modificators.scrollHidden);
};

const setMenuArrowsBehaviour = (arrows, menuLists) => {
  for (let i = 0; i < menuLists.length; i++) {
    arrows[i].forEach((arrow) => {
      arrow.addEventListener('click', () => {
        const subMenu = arrow.nextElementSibling;
        const currentArrow = arrow;

        if (subMenu.classList.contains(extraClasses.opened)) {
          subMenu.classList.remove(extraClasses.opened);
          currentArrow.classList.remove(modificators.arrowActive);
        } else {
          menuLists[i].forEach((el) => el.classList.remove(extraClasses.opened));
          arrows[i].forEach((el) => el.classList.remove(modificators.arrowActive));
          currentArrow.classList.add(modificators.arrowActive);
          subMenu.classList.add(extraClasses.opened);
        }

        subMenu.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
  }
};

const initBlackout = (args) => {
  document.addEventListener('click', (e) => {
    const { target } = e;

    if (args.page.classList.contains(modificators.blackout) && target === args.page) {
      removeBurgerClasses(args);
    }
  });
};

const setMenuBehaviour = (args) => {
  if (isMobile()) {
    args.body.classList.add(extraClasses.touch);
  } else {
    removeBurgerClasses(args);
    args.body.classList.remove(extraClasses.touch);
  }
};

const setMenuBehaviourOnResize = (args) => {
  const mediaBreakpoint = 767;

  window.addEventListener('resize', () => {
    if (document.documentElement.clientWidth > mediaBreakpoint && !isMobile()) {
      removeBurgerClasses(args);
      args.body.classList.remove(extraClasses.touch);
    } else if (document.documentElement.clientWidth <= mediaBreakpoint && !isMobile()) {
      args.body.classList.add(extraClasses.touch);
    } else if (document.documentElement.clientWidth > mediaBreakpoint && isMobile()) {
      removeBurgerClasses(args);
    }
  });
};

initBlackout(commonArguments);
setMenuBehaviour(commonArguments);
toggleBurgerClasses(commonArguments);
setMenuBehaviourOnResize(commonArguments);
setMenuArrowsBehaviour(
  [dom.menuArrows.firstLvl, dom.menuArrows.secondLvl],
  [dom.menuLists.secondLvl, dom.menuLists.thirdLvl]
);
