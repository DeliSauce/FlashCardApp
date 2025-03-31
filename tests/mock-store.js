export const store = {
  collections: [
    {
      id: "coll_001",
      title: "Collection 1 - JavaScript Fundamentals",
      createdAt: "2025-03-15T09:30:00Z",
      updatedAt: "2025-03-20T14:15:00Z",
      cards: [
        {
          id: "card_001",
          question: "NOT TESTWhat is the difference between 'let' and 'const' in JavaScript?",
          answer: "Both 'let' and 'const' are block-scoped variables. \n\n\n ``` const thisIsATest ``` \n\n\n The difference is that 'let' allows for reassignment while 'const' creates a variable with a constant reference (not value). Objects assigned with 'const' can still have their properties modified.", 
          link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const",
          topic: "JS",
          orientation: "both",
          status: "final",
          createdAt: "2025-03-15T10:15:00Z",
          updatedAt: "2025-03-15T10:15:00Z"
        },
        {
          id: "card_002",
          question: "How does JavaScript event delegation work?",
          answer: "Event delegation is a technique where you attach an event listener to a parent element instead of individual child elements. When an event occurs on a child, it bubbles up to the parent where it can be handled. This is useful for dynamically added elements and reduces the number of event listeners.", 
          link: "https://javascript.info/event-delegation",
          topic: "JS",
          orientation: "both",
          status: "final",
          createdAt: "2025-03-16T11:45:00Z",
          updatedAt: "2025-03-17T13:20:00Z"
        },
        {
          id: "card_003",
          question: "What are JavaScript closures and why are they useful?",
          answer: "A closure is a function that has access to its own scope, the outer function's variables, and global variables, even after the outer function has returned. Closures are useful for data privacy, creating function factories, and maintaining state in asynchronous operations.", 
          link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures",
          topic: "JS",
          orientation: "both",
          status: "final",
          createdAt: "2025-03-17T09:30:00Z",
          updatedAt: "2025-03-18T16:45:00Z"
        }
      ]
    },
    {
      id: "coll_002",
      title: "Collection 2 - React Essentials",
      createdAt: "2025-03-16T13:20:00Z",
      updatedAt: "2025-03-19T11:05:00Z",
      cards: [
        {
          id: "card_004",
          question: "What is the purpose of React's virtual DOM?",
          answer: "The virtual DOM is a lightweight copy of the actual DOM that React uses to improve performance. When state changes, React creates a new virtual DOM tree, compares it with the previous one (diffing), and then only updates the real DOM with the necessary changes, minimizing expensive DOM operations.", 
          link: "https://reactjs.org/docs/faq-internals.html",
          topic: "React",
          orientation: "both",
          status: "final",
          createdAt: "2025-03-16T14:10:00Z",
          updatedAt: "2025-03-16T14:10:00Z"
        },
        {
          id: "card_005",
          question: "What are React hooks and what problem do they solve?",
          answer: "Hooks are functions that let you 'hook into' React state and lifecycle features from function components. They solve the problem of reusing stateful logic between components without changing your component hierarchy. Hooks like useState, useEffect, and useContext allow function components to replace class components in most cases.", 
          link: "https://reactjs.org/docs/hooks-intro.html",
          topic: "React",
          orientation: "both",
          status: "final",
          createdAt: "2025-03-17T10:25:00Z",
          updatedAt: "2025-03-18T09:15:00Z"
        },
        {
          id: "card_006",
          question: "What is the difference between controlled and uncontrolled components in React?",
          answer: "In a controlled component, form data is handled by React state. The component receives its current value as a prop and has callbacks to change that value. In an uncontrolled component, form data is handled by the DOM itself, using refs to access the form values when needed, rather than through state.", 
          link: "https://reactjs.org/docs/uncontrolled-components.html",
          topic: "React",
          orientation: "both",
          status: "final",
          createdAt: "2025-03-18T15:40:00Z",
          updatedAt: "2025-03-19T11:05:00Z"
        }
      ]
    },
    {
      id: "coll_003",
      title: "Collection 3 - Web Development Concepts",
      createdAt: "2025-03-18T08:45:00Z",
      updatedAt: "2025-03-21T09:30:00Z",
      cards: [
        {
          id: "card_007",
          question: "What is the difference between localStorage and sessionStorage?",
          answer: "Both are web storage APIs that store data in key-value pairs. The main difference is persistence: localStorage data has no expiration time and remains until explicitly deleted. sessionStorage data is cleared when the page session ends (when the tab/browser is closed). Both are limited to about 5MB and are domain-specific.", 
          link: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API",
          topic: "Web",
          orientation: "both",
          status: "final",
          createdAt: "2025-03-18T09:20:00Z",
          updatedAt: "2025-03-18T09:20:00Z"
        },
        {
          id: "card_008",
          question: "What are CORS (Cross-Origin Resource Sharing) and why is it important?",
          answer: "CORS is a security feature implemented by browsers that restricts web pages from making requests to domains other than the one that served the web page. It's important because it prevents malicious websites from making unauthorized requests to other sites using your credentials. CORS headers allow servers to specify which origins are permitted to access their resources.", 
          link: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS",
          topic: "Web",
          orientation: "both",
          status: "final",
          createdAt: "2025-03-19T14:30:00Z",
          updatedAt: "2025-03-20T11:15:00Z"
        },
        {
          id: "card_009",
          question: "What is the critical rendering path in web browsers?",
          answer: "The critical rendering path is the sequence of steps the browser takes to convert HTML, CSS, and JavaScript into actual pixels on the screen. It involves constructing the DOM and CSSOM, combining them into the render tree, layout/reflow, and finally painting. Optimizing this path is crucial for improving page load performance.", 
          link: "https://developers.google.com/web/fundamentals/performance/critical-rendering-path",
          topic: "Web",
          orientation: "both",
          status: "final",
          createdAt: "2025-03-20T16:45:00Z",
          updatedAt: "2025-03-21T09:30:00Z"
        },
        {
          id: "card_010",
          question: "What is the critical rendering path in web browsers?",
          answer: "", 
          link: "",
          topic: "Web",
          orientation: "both",
          status: "final",
          createdAt: "2025-03-20T16:45:00Z",
          updatedAt: "2025-03-21T09:30:00Z"
        }
      ]
    }
  ]
}