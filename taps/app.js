const $tabs = document.querySelector('.tabs');

const state = {
  tabs: [],
  navState: 1,
  gliderState: 0,
  gliderMove: 200,
};

const fetchTabsData = () => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          {
            id: 1,
            title: 'HTML',
            content: `HTML(HyperText Markup Language) is the most basic building block of the Web. It describes and defines the content of a webpage along with the basic layout of the webpage. Other technologies besides HTML are generally used to describe a web page's appearance/presentation(CSS) or functionality/ behavior(JavaScript).`,
          },
          {
            id: 2,
            title: 'CSS',
            content: `Cascading Style Sheets(CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.`,
          },
          {
            id: 3,
            title: 'JavaScript',
            content: `JavaScript(JS) is a lightweight interpreted or JIT-compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.`,
          },
        ]),
      1000
    );
  });
};

const navRender = ({ tabs }) => {
  $tabs.innerHTML = `<nav>
  ${tabs
    .map(
      (tab) => `
  <input type="radio" id="${tab.id}" name="tab" ${
        tab.id === 1 ? 'checked' : ''
      } />
  <label class="tab" for="${tab.id}">${tab.title}</label> 
  `
    )
    .join('')}
  <span class="glider"></span>
  </nav>
  `;
};

const contentRender = ({ tabs }) => {
  const { content } = tabs.find((tab) => tab.id === state.navState);
  const $div = document.createElement('div');
  const $textNode = document.createTextNode(content);
  $div.setAttribute('class', 'tab-content active');
  $div.append($textNode);
  $tabs.append($div);
};

const initialRender = async () => {
  try {
    state.tabs = await fetchTabsData();
    document.body.style.setProperty('--tabs-length', state.tabs.length);
    document.querySelector('.spinner').style.display = 'none';
    navRender(state);
    contentRender(state);
  } catch (e) {
    console.error(e);
  }
};

const changeStates = (states, target) => {
  states.navState = +target.htmlFor;
  states.gliderState = +target.htmlFor - 1;
};

const gliderMove = () => {
  const $glider = document.querySelector('.glider');
  $glider.style.left = `${state.gliderState * state.gliderMove}px`;
};

$tabs.addEventListener('click', ({ target }) => {
  if (!target.matches('label')) return;
  $tabs.lastElementChild.remove();
  changeStates(state, target);
  contentRender(state);
  gliderMove();
});

document.addEventListener('DOMContentLoaded', initialRender);
