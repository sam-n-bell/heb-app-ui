import Vue from 'vue'

Vue.filter('capitalize', val => val.charAt(0).toUpperCase() + val.slice(1))
Vue.filter('moneyPrecision', val => Number(val).toFixed(2))
Vue.filter('capitalizeEachWord', (val) => {
    let wordsSplit = val.split(' ');
    for (let i = 0; i < wordsSplit.length; i++) {
        wordsSplit[i] = wordsSplit[i][0].toUpperCase() + wordsSplit[i].slice(1);
    }
    return wordsSplit.join(' ');
})