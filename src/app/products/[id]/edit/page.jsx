import { notFound } from 'next/navigation';
import { getProductById } from '@/actions/products.action';
import EditProductForm from '@/components/EditProductForm';



export default async function EditProductPage({ params }) {
    const {id} = await params;
    const product = await getProductById(id);

    if (!product) notFound();

    return (
        <div className="min-h-screen bg-gray-950 p-6">
            <div className="max-w-lg mx-auto">
                <EditProductForm product={product} />
            </div>
        </div>
    );
}