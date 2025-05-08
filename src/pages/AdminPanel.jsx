

import { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Joi from 'joi';
import { useProductStore } from '../store/ProductStore';
import './AdminPanel.css';

const productSchema = Joi.object({
  title: Joi.string().min(2).required().messages({
    'string.empty': 'Namn är obligatoriskt',
    'string.min': 'Namn måste ha minst 2 bokstäver'
  }),
  price: Joi.number().positive().required().messages({
    'number.base': 'Pris måste vara ett nummer',
    'number.positive': 'Pris måste vara positivt',
    'any.required': 'Pris är obligatoriskt'
  }),
  imageUrl: Joi.string().uri().required().messages({
    'string.uri': 'Bildlänk måste vara en giltig URL',
    'string.empty': 'Bildlänk är obligatoriskt'
  }),
});

function AdminPanel() {
  const { products, setProducts, updateProduct, removeProduct } = useProductStore();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', price: '', imageUrl: '' });
  const [editFormData, setEditFormData] = useState({ title: '', price: '', imageUrl: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const snapshot = await getDocs(collection(db, 'product'));
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(list);
    };
    fetch();
  }, [setProducts]);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'product', id));
    removeProduct(id);
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditFormData({ title: product.title, price: product.price, imageUrl: product.imageUrl });
    setErrors({});
  };

  const handleSave = async (id) => {
    const { error } = productSchema.validate(editFormData, { abortEarly: false });

    if (error) {
      const errObj = {};
      error.details.forEach(detail => {
        errObj[detail.path[0]] = detail.message;
      });
      setErrors(errObj);
      return;
    }

    const updatedProduct = {
      title: editFormData.title,
      price: Number(editFormData.price),
      imageUrl: editFormData.imageUrl,
    };

    await updateDoc(doc(db, 'product', id), updatedProduct);
    updateProduct({ ...updatedProduct, id });
    setEditingId(null);
    setEditFormData({ title: '', price: '', imageUrl: '' });
    setErrors({});
  };

  const handleAddProduct = async () => {
    const { error } = productSchema.validate(formData, { abortEarly: false });

    if (error) {
      const errObj = {};
      error.details.forEach(detail => {
        errObj[detail.path[0]] = detail.message;
      });
      setErrors(errObj);
      return;
    }

    const newProduct = {
      title: formData.title,
      price: Number(formData.price),
      imageUrl: formData.imageUrl
    };

    const docRef = await addDoc(collection(db, 'product'), newProduct);
    setProducts([...products, { ...newProduct, id: docRef.id }]);
    setFormData({ title: '', price: '', imageUrl: '' });
    setErrors({});
  };

  return (
    <div className="admin-panel">
      <h2>Adminpanel</h2>
      <div className="add-product-form">
        <h3>Lägg till ny produkt</h3>
        <input
          type="text"
          placeholder="Namn"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        {errors.title && <span className="error">{errors.title}</span>}
        <input
          type="number"
          placeholder="Pris"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        {errors.price && <span className="error">{errors.price}</span>}
        <input
          type="text"
          placeholder="Bildlänk"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
        />
        {errors.imageUrl && <span className="error">{errors.imageUrl}</span>}
        <button onClick={handleAddProduct}>Lägg till</button>
      </div>

      {products.map(product => (
        <div key={product.id} className="admin-product-card">
          {editingId === product.id ? (
            <div className="edit-form">
              <input
                type="text"
                value={editFormData.title}
                onChange={e => setEditFormData({ ...editFormData, title: e.target.value })}
                placeholder="Namn"
              />
              {errors.title && <span className="error">{errors.title}</span>}
              <input
                type="number"
                value={editFormData.price}
                onChange={e => setEditFormData({ ...editFormData, price: e.target.value })}
                placeholder="Pris"
              />
              {errors.price && <span className="error">{errors.price}</span>}
              <input
                type="text"
                value={editFormData.imageUrl}
                onChange={e => setEditFormData({ ...editFormData, imageUrl: e.target.value })}
                placeholder="Bild länk"
              />
              {errors.imageUrl && <span className="error">{errors.imageUrl}</span>}
              <button onClick={() => handleSave(product.id)}>Spara</button>
            </div>
          ) : (
            <>
              <img src={product.imageUrl} alt={product.title} />
              <p><strong>{product.title}</strong></p>
              <p>{product.price} kr</p>
              <button onClick={() => handleEditClick(product)}>✏️ Ändra</button>
              <button onClick={() => handleDelete(product.id)}>🗑️ Ta bort</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;