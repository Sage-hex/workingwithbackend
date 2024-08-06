import {createBrowserRouter} from 'react-router-dom'
import Home from '../../Pages/Home/Home'
const router = createBrowserRouter ([
    {
        path: '/',
        element: <Root/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/login',
                element: <Login/>
            }
        ]
    }
])

export default router