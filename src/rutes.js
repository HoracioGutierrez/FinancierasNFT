import Dashboard from "./components/pages/Dashboard"
import FintechList from "./components/pages/FintechList"
import MinterList from "./components/pages/MinterList"
import Start from "./components/pages/Start"

const routes = [
    {
        path: "/",
        component: Start,
        exact: true,
        public: true
    },
    {
        path: "/dashboard",
        component: Dashboard,
        exact: true,
        public: false,
        privilege : ["admin","financiera"]
    },
    {
        path: "/fintechlist",
        component: FintechList,
        exact: true,
        public: false,
        privilege : ["admin"]
    },
    {
        path: "/minterlist",
        component: MinterList,
        exact: true,
        public: false,
        privilege : ["admin"]
    }
]


export default routes