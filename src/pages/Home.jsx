

import { useEffect, useState } from 'react'; 
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useProductStore } from '../store/ProductStore';
import ProductCard from '../components/ProductCard';
import './Home.css';

function Home() {
  const { products, setProducts } = useProductStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'product'));
        const productList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          price: Number(doc.data().price),
        }));
        setProducts(productList);
      } catch (error) {
        console.error("❌ Det finns ett problem", error);
        setError("Det finns ett problem");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setProducts]);

  if (loading) return <p>..loading</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home-container">
      <h1>🎉 Sommarleksaker</h1>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Det finns ingenting</p>
        )}
      </div>
    </div>
  );
}

export default Home;