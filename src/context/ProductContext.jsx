import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const initialProducts = [
    {
        id: 1,
        title: "Ten First Dates",
        author: "Unknown",
        image: null,
        price: 19.99,
        description: "A heartwarming romance about finding love in unexpected places.",
        color: "from-pink-500 to-rose-500",
        category: "Romance",
        rating: 4.5,
        reviews: 128,
        format: "Paperback",
        isNew: true
    },
    {
        id: 2,
        title: "The World Atlas of Coffee",
        author: "James Hoffman",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTsCI3f0JWTqEDp_uBknAWFR3TJ_XEauSTG4k9OBPpcIiVy-NuZmOI-I8OPLn8r2UIUna6uuJ-MCElZA-veoKuyLY9zXIDwNlBcURBE6OnftaMQWGas63NRU-itpEgZvhs8VVhG5hZ5IzfWV2meTjsg91RyXmkA1JIJgnGMCcDBx5705-3UEa8_AXgJAgphWALgruAD-6ozCdPkfp10GoyuwcSvDbYdk1JpiygBPpBfR2pRR1qNnSUE9zX1njVmaeTQte1gyz_MWs",
        price: 35.00,
        description: "The definitive guide to coffee from the world-renowned expert.",
        category: "Non-Fiction",
        rating: 4.9,
        reviews: 312,
        format: "Hardcover",
        isBestSeller: true
    },
    {
        id: 3,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXVQ9xcXMP7T6k5pzSGcC0FPjUdrcTDuwtXNTLfttFB8djb6HY4_K4hJY1NPYKzvSY2MBK0unhLeWiO9vMVcuKGhOOALRJdOiYRUb16lbFehYITr1cLkWlw8aKh23BcZCB6UI0dYT4EkrkUZX2rdRH3r0sOvb-cfoh_WIEwFG000yC-yiDA7l51138eUOQiXMXAPdj9tKwOafyoB9Fn1LOySjp5fDrZLshVwWjtnBTMWN8fqHtkfp5FSfyV2gfrCb6PFw43Et509Q",
        price: 14.95,
        description: "A shocking psychological thriller about a woman's act of violence against her husband.",
        category: "Thriller",
        rating: 4.7,
        reviews: 2450,
        format: "Audiobook",
        isBestSeller: true
    },
    {
        id: 4,
        title: "Easy Fast Cooking",
        author: "Jessica Johnson",
        image: null,
        price: 12.99,
        description: "Delicious recipes you can make in under 30 minutes.",
        color: "from-orange-400 to-red-500",
        category: "Cooking",
        rating: 4.2,
        reviews: 89,
        format: "eBook"
    },
    {
        id: 101,
        title: "The Midnight Library",
        author: "Matt Haig",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcm7T09T3wuefl84V_i2B2FeeEoIKtS6r2N5jaHHvbD7yywArtS4DX6VAKngn20hp2wz8grQTyet1Z7ZuhNkR9gEwXuVKi8sgCA6w35YLVwn0tWq6rq9GpmEsSI-nVsfEjXLpQ11lmUPNAbA0VL4g8qIWV7KBgDLEkbbAm6LpWkyz6oqFt6Vk4ky7pXNDfwQ0vy4xk241SUe0PUD0kKvW_1wFBEJ2cJ50ZHcDFA9qEqE8xmWH8EooEDCNVCMcul5Wm7_QpkSnX8k8",
        price: 24.99,
        description: "Between life and death there is a library. A novel about all the choices that go into a life well lived.",
        category: "Fiction",
        rating: 4.8,
        reviews: 5430,
        format: "Hardcover",
        isBestSeller: true
    },
    {
        id: 102,
        title: "Project Hail Mary",
        author: "Andy Weir",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkzIyuix5F8-RDWR1UPgzlPLeSepLxeooaIUjJbBXBJFg8MYzbMTB9WftKZdXyDJ-u-FvLxAmTUuF5y8X8THF-QpaRiEGI1aPmiIHFo-X3-krgWOaKtlJ1wS4H_hDTixxmBRBjTopyZwn0wd70xc_znaa-JnrukMOK2kdGNdo7iWlAJ-p9IGIO982_MRv4N3HMNdpuyN0ImylnvV6DM7TnZa21gJfo_9o1fAnO7UwvFW4y4UJzvJw1nFNrWvgyz3RScWkVWDINgbQ",
        price: 24.99,
        description: "A lone astronaut must save the earth from disaster in this intergalactic adventure.",
        category: "Sci-Fi",
        rating: 4.9,
        reviews: 8902,
        format: "Hardcover",
        isBestSeller: true
    },
    {
        id: 103,
        title: "Dune",
        author: "Frank Herbert",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLoZ5-pYvMiBlFlJCLcpxnMHTKPEKXPDCugyzgrC3XL5RfPHyokqlzacQEcnfy-KD9mWoovm-y1Y0MiL4W66T0WWXTZVnnag73hPjgYy4PY72dy0SxIrVA6-sYr58t6QMRetVIbvoek9USwUenroerODcfNAjiMWVHCkFkpQtdUWIynTHzMHhyZaIorLRwpwX2JM8AeM3LPW5yZ7yFa3Gt3D7dFcWIsMSV5c5xJrCq5MoArk9EVFeDnuHS-zEB_7HHq_Au8b9cnyQ",
        price: 18.99,
        description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides.",
        category: "Sci-Fi",
        rating: 4.9,
        reviews: 12000,
        format: "Paperback"
    },
    {
        id: 104,
        title: "Klara and the Sun",
        author: "Kazuo Ishiguro",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTsCI3f0JWTqEDp_uBknAWFR3TJ_XEauSTG4k9OBPpcIiVy-NuZmOI-I8OPLn8r2UIUna6uuJ-MCElZA-veoKuyLY9zXIDwNlBcURBE6OnftaMQWGas63NRU-itpEgZvhs8VVhG5hZ5IzfWV2meTjsg91RyXmkA1JIJgnGMCcDBx5705-3UEa8_AXgJAgphWALgruAD-6ozCdPkfp10GoyuwcSvDbYdk1JpiygBPpBfR2pRR1qNnSUE9zX1njVmaeTQte1gyz_MWs",
        price: 22.00,
        description: "An Artificial Friend named Klara watches the world from her store window.",
        category: "Fiction",
        rating: 4.4,
        reviews: 980,
        format: "Hardcover",
        isNew: true
    },
    {
        id: 105,
        title: "Atomic Habits",
        author: "James Clear",
        image: null,
        price: 16.99,
        description: "An easy & proven way to build good habits & break bad ones.",
        color: "from-yellow-500 to-amber-600",
        category: "Self-Help",
        rating: 4.9,
        reviews: 15000,
        format: "Paperback",
        isBestSeller: true
    },
    {
        id: 106,
        title: "Becoming",
        author: "Michelle Obama",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBW8Qm0MzOy5CxZ-gSa24kVjz4I4im9-2VmdenY3koCGeOmfGyPREQ7v1d7oMps4DeKTkgq2gCMLbyEQFY_n4Wxcy1kNgs5htE5_0jMPbxBC-DWVVVK21pFrS4RiM1l1DcQYsZ1YgD7OfKFpcXi0lYAcqbXBxuOG5JLKePfh-mm3Htj-_Ij_vbb0JcwV6XVX1LS8SmqJuoCplABaLvGhyPS5w7-XWUQeovI9KHFbg8Fe_uOzHrOkxpcptgS-CgBIRBegsik81O63CQ",
        price: 19.50,
        description: "The memoir of former United States First Lady Michelle Obama.",
        category: "Biography",
        rating: 4.8,
        reviews: 11200,
        format: "Audiobook"
    }
];

export const ProductProvider = ({ children }) => {
    // Initialize from localStorage or use initialProducts
    const [products, setProducts] = useState(() => {
        try {
            const saved = localStorage.getItem('products');
            return saved ? JSON.parse(saved) : initialProducts;
        } catch (e) {
            console.error("Failed to load products", e);
            return initialProducts;
        }
    });

    // Save to localStorage whenever products change
    React.useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    const getProductById = (id) => products.find(p => p.id === parseInt(id));

    const addReview = (productId, review) => {
        setProducts(prevProducts => {
            return prevProducts.map(product => {
                if (product.id === parseInt(productId)) {
                    const newReviewsCount = (product.reviews || 0) + 1;
                    const currentRating = product.rating || 0;
                    const oldTotalScore = currentRating * (product.reviews || 0);
                    const newRating = (oldTotalScore + review.rating) / newReviewsCount;

                    return {
                        ...product,
                        reviews: newReviewsCount,
                        rating: parseFloat(newRating.toFixed(1)), // Keep it to 1 decimal
                        userReviews: [review, ...(product.userReviews || [])]
                    };
                }
                return product;
            });
        });
    };

    const addProduct = (newProduct) => {
        const id = Math.max(...products.map(p => p.id), 0) + 1;
        setProducts(prev => [{ ...newProduct, id, reviews: 0, rating: 0, userReviews: [] }, ...prev]);
    };

    const updateProduct = (id, updatedData) => {
        setProducts(prev => prev.map(p => p.id === parseInt(id) ? { ...p, ...updatedData } : p));
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== parseInt(id)));
    };

    return (
        <ProductContext.Provider value={{ products, getProductById, addReview, addProduct, updateProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
};
