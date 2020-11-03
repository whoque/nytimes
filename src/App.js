import Header from './containers/header/header';
import Content from './containers/content/content';
import Footer from './containers/footer/footer';
import './App.scss';

function App() {
  return (
    <div className="container">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
