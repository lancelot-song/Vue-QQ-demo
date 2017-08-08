import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '@/components/Main.vue';
// import MessageList from '@/components/MessageList.vue';'@/components/Hello'
// import MessageChat from '@/components/MessageChat.vue';
// import Contact from '@/components/ContactHead.vue';
// import Dynamic from '@/components/DynamicHead.vue';

Vue.use(VueRouter)

const router = new VueRouter({
    linkActiveClass: 'active',
    routes : [
        {
            path : "/" ,
            redirect : "/message"
        },
        {
            path : "/message" , 
            component: Main,
            children : [
                {
                    path : "",
                    component : (resolve) =>{
                        require(['@/components/MessageList.vue'], resolve);
                    }
                }
            ]
        },
        {
            path : "/chat" , 
            component : (resolve) =>{
                require(['@/components/MessageChat.vue'], resolve);
            } 
        },
/*        {
            path : "/message" , component: Main,
            children : [ 
                {
                    path:"" , component : (resolve) =>{
                        require(['@/components/MessageList.vue'], resolve)
                    } 
                },
                {
                    path:"chat", component : (resolve) =>{
                        require(['@/components/MessageChat.vue'], resolve)
                    } 
                }
            ]
        },*/
        {
            path : "/contact" , component: Main,
            children : [
                {
                    path:"" , component :  (resolve) =>{
                        require(['@/components/ContactList.vue'], resolve)
                    } 
                },
            ]
        },
        {
            path : "/dynamic" , component: Main,
            children : [
                {
                    path:"" , component :  (resolve) =>{
                        require(['@/components/DynamicList.vue'], resolve)
                    } 
                },
            ]
        }
    ]
})
// router.watch({

//                 '$route' (to, from) {
//                     console.log(to,from)
//                 }
// })
export default router;