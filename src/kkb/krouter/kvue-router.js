// 实现一个插件
// 返回一个函数，或者返回一个对象。他有一个install（静态）方法，也可以用static声明

import router from "../../router";

// 这里定义一个_Vue,去接受Vue.use()传进来的Vue，而不直接引入一个Vue，是为了避免增大体积，打包增加不必要的依赖
let _Vue

class VueRouter {
    // 选项 routes 路由表（也会有其他参数，这里先不考虑）
    constructor(options) {
        this.$options = options;

        // 需要定义一个响应式的current属性
        const initial = window.location.hash.slice(1)
        _Vue.util.defineReactive(this, 'current', initial)
        
        // 监听url变化
        window.addEventListener('hashchange', this.onHashChange.bind(this))
    }

    onHashChange() {
        // 只要#后面的部分
        this.current = window.location.hash.slice(1)
    }
}

Vue.install = function (Vue) {
    // 引用Vue构造函数，在上面 VueRouter中使用
    _Vue = Vue

    // 1.挂载 $router
    Vue.mixin({
        beforeCreate() {
            // 此处的this指的是Vue根实例
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router
            }
        }
    })

    // 2.创建router-link, router-view

    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                require: true
            }
        },

        render(h) {
            return h('a', {
                attrs: {
                    href: '#' + this.to
                }
            }, this.$slots.default)
        }
    })

    Vue.component('router-view', {
        render(h) {
            let component = null
            // 早点当前url对应的组件
            const route = this.$router.$options.routes.find(route => route.path === this.$router.current)
            console.log(route);
            component = route.component
            // 渲染传入组件
            return h(component)
        }
    })
}

export default VueRouter