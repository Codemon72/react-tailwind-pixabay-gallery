import { useState, useEffect } from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}`)
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mx-auto">
      <ImageSearch />
      {isLoading 
        ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> 
        : images.map(image => (
        <div className="grid grid-cols-3 gap4">
          <ImageCard key={image.id} image={image}/>
        </div>
      ))}
    </div>
  );
}

export default App;
