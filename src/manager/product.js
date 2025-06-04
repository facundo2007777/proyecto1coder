import fs from "fs";

class ProductManager {
    constructor(path) {
        this.path = path;
        this.fs = fs.promises; 
    }

    async getProducts(){
        try {
            const fileData = await this.fs.readFile(this.path, 'utf-8');
            const data = JSON.parse(fileData);
            return data;
        } catch (error) {
            if (error.code === "ENOENT") return [];
            throw error;
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        const product = products.find(p => p.id === Number(id));
        return product || null;
    }


    async addProduct(newProduct) {
        const products = await this.getProducts();

        let newId = 1;
        if (products.length > 0) {
            const productIds = products.map(p => p.id);
            const maxId = Math.max(...productIds);
            newId = maxId + 1;
        }

        newProduct.id = newId;
        products.push(newProduct);

        await this.fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return newProduct;
    }

    async updateProduct(id, updatedFields) {
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index === -1) return null;
        updatedFields.id = products[index].id;

        products[index] = { ...products[index], ...updatedFields };

        await this.fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return products[index];
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const filteredProducts = products.filter(p => p.id !== id);
        if (filteredProducts.length === products.length) return null;

        await this.fs.writeFile(this.path, JSON.stringify(filteredProducts, null, 2));
        return true;
    }
}

export default ProductManager;
