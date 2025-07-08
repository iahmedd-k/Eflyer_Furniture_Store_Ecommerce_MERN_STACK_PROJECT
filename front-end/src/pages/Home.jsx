import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PopularFurniture from '../components/PopularFurniture';
import PopularCategories from '../components/PopularFurniture';
import AmbitionSection from '../components/AmbitionSection';
import GalleryScroll from '../components/GallerySection';
import Footer from '../components/Footer';
import ProductPreviewSection from '../components/ProductPreviewSection';
import ProductDetails from './ProductDetails';

function Home() {
    return (
        <div>

            <Hero />
            <PopularCategories />
            <AmbitionSection />
            <ProductPreviewSection />
            <GalleryScroll />
        </div>
    );
}

export default Home;