const dom = {
  burger: document.querySelector('.burger'),
  body: document.querySelector('body'),
  menu: document.querySelector('.menu'),
  menuArrows: document.querySelectorAll('.menu__arrow'),
  menuItems: {
    firstLvl: document.querySelectorAll('.menu__item'),
    secondLvl: document.querySelectorAll('.menu__subitem'),
  },
};

const modificators = {
  burgerActive: 'burger--active',
  menuBurger: 'menu--burger',
  arrowVisible: 'menu__arrow--visible',
  arrowActive: 'menu__arrow--active'
};

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const toggleBurgerClasses = (burger, menu) => {
  burger.addEventListener('click', () => {
    burger.classList.toggle(modificators.burgerActive);
    menu.classList.toggle(modificators.menuBurger);
  });
};

const removeBurgerClasses = (burger, menu) => {
  burger.classList.remove(modificators.burgerActive);
  menu.classList.remove(modificators.menuBurger);
};

const setMenuLinksDesktopBehaviour = (items) => {
  items.forEach((el) => {
    el.addEventListener('mouseout', () => {
      el.classList.remove('hover');
    });

    el.addEventListener('mouseover', () => {
      el.classList.add('hover');
    });
  });
};

const setMenuLinksMobileBehaviour = (items) => {
  items.forEach((el) => {
    el.removeEventListener('mouseout', () => {
      el.classList.remove('hover');
    });

    el.removeEventListener('mouseover', () => {
      el.classList.add('hover');
    });
  });
};

const setMenuArrowsMobileBehaviour = (arrows) => {
  arrows.forEach((el) => {
    el.classList.add(modificators.arrowVisible);

    const subMenu = el.nextElementSibling;
    const arrow = el;

    el.addEventListener('click', () => {
      subMenu.classList.toggle('open');
      arrow.classList.toggle(modificators.arrowActive);
    });
  });
};

const setMenuArrowsDesktopBehaviour = (arrows) => {
  arrows.forEach((el) => {
    el.classList.remove(modificators.arrowVisible);

    const subMenu = el.nextElementSibling;
    const arrow = el;

    el.removeEventListener('click', () => {
      subMenu.classList.toggle('open');
      arrow.classList.toggle(modificators.arrowActive);
    });
  });
};

const setMenuBehaviour = (items, arrows) => {
  if (isMobile()) {
    setMenuLinksMobileBehaviour(items);
    setMenuArrowsMobileBehaviour(arrows);
  } else {
    setMenuLinksDesktopBehaviour(items);
    setMenuArrowsDesktopBehaviour(arrows);
  }
};

const checkMenuBehaviourOnResize = (items, arrows) => {
  window.addEventListener('resize', () => {
    if (!isMobile()) {
      removeBurgerClasses(dom.burger, dom.menu);
      setMenuLinksDesktopBehaviour(items);
      setMenuArrowsDesktopBehaviour(arrows);
    } else {
      setMenuLinksMobileBehaviour(items);
      setMenuArrowsMobileBehaviour(arrows);
    }
  });
};

setMenuBehaviour(dom.menuItems.firstLvl, dom.menuArrows);
toggleBurgerClasses(dom.burger, dom.menu);
checkMenuBehaviourOnResize(dom.menuItems.firstLvl, dom.menuArrows);

