import Vue from 'vue'
import { isNumber } from 'util';

Vue.filter('capitalize', val => val ? val.charAt(0).toUpperCase() + val.slice(1) : '')
Vue.filter('moneyPrecision', val => val && isNumber(val) ? Number(val).toFixed(2) : val)
Vue.filter('capitalizeEachWord', (val) => {
    if (val) {
        let wordsSplit = val.split(' ');
        for (let i = 0; i < wordsSplit.length; i++) {
            wordsSplit[i] = wordsSplit[i][0].toUpperCase() + wordsSplit[i].slice(1);
        }
        return wordsSplit.join(' ');
    } else {
        return val
    }
})
Vue.filter('uppercase', val => val ? val.toUpperCase() : '')
