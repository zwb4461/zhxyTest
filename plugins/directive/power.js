import Vue from "vue";
const getPower = val => {
  let power = JSON.parse(sessionStorage.getItem("power"));
  let index = power.findIndex(item => item === val);

  return index > -1;
};

// const power = Vue.directive('power', {
//     // 当被绑定的元素插入到 DOM 中时……
//     inserted(el, { arg }, vnode) {
//         // 聚焦元素
//         // console.log('el-------------', el);
//         // console.log('binding-------------', arg);
//         // console.log('vnode-------------', vnode);
//         // console.log('路由-------------', $nuxt.$route);
//         // console.log('session-------------', JSON.parse(sessionStorage.getItem('power')));

//         if (!getPower(arg)) {
//             el.parentNode && el.parentNode.removeChild(el)
//         }
//     },
// })

Vue.prototype.$power = getPower;
// export default () => {
//     window.onNuxtReady(() => {
//         Vue.prototype.$power = getPower;
//     });
// }
