import { Switch, Route } from 'react-router-dom';

import './App.css';
import Homepage from './pages/homepage/homepage.component';
import Shoppage from './pages/shop/shop.component';
import Header from './components/header/header.component';

// const HatsPage = () => (
//   <div>
//     <h1>HATS PAGE</h1>
//   </div>
// );

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/shop" component={Shoppage} />

        {/* <Route path="/hats" component={HatsPage} /> */}
      </Switch>
    </div>
  );
}

export default App;
