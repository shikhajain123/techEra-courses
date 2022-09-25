import {Route, Switch} from 'react-router-dom'
import CourseItem from './components/CourseItem'

import CourseItemDetails from './components/CourseItemDetails'

import NotFound from './components/NotFound'
import './App.css'

// Replace your code here
const App = () => (
  <div>
    <Switch>
      <Route path="/" component={CourseItem} />
      <Route path="/courses/:id" component={CourseItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
