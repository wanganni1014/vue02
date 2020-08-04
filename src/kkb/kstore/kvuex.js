// 1.实现插件
let _Vue

class Store {
    constructor(options) {
        this._mutations = options.mutations
        this._actions = options.actions
        this._getters = options.getters
        console.log(this._getters)

        // 创建响应式state
        // this.$store.state.counter
        this._vm = new _Vue({
            data() {
                return {
                    // 约定：不希望被代理就加上$
                    $$state: options.state
                }
            }
        })

        // 修改this指向
        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)

        // getters
        this.getters = {}
        let getterKeys = Object.keys(this._getters)
        console.log(getterKeys)
        getterKeys.map(fnName => {
            this.getters[fnName] = this._getters[fnName](options.state)
        })

        // 数据响应式
        console.log(this.getters)
        getterKeys.map(fnName => {
            Object.defineProperty(this.getters, fnName, {
                get: () => this._getters[fnName](options.state),
                enumerable: true
            })
        })
    }

    get state() {
        return this._vm._data.$$state
    }

    set state(v) {
        console.log('please use replaceState to reset state')
    }

    // 修改state
    // this.$store.commit('add', 1)
    commit(type, payload) {
        // 获取type对应的mutation
        const fn = this._mutations[type]

        if(!fn) {
            console.log('unknow mutation')
            return
        }

        // 传入state作为参数
        fn(this.state, payload)
    }

    dispatch(type, payload) {
        const fn = this._actions[type]

        if (!fn) {
            console.log('unknow action')
            return
        }

        return fn(this, payload)
    }
}

function install(Vue) {
    _Vue = Vue

    // 混入
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}

export default {Store, install}