"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
  Spinner,
  Image,
} from "@heroui/react";
import { Plus, Edit, Trash2, Search } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "everyday-hijab",
    description: "",
    regularPrice: "",
    discountPrice: "",
    stock: "",
    fabric: "",
    colors: "",
    sizes: "",
    images: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenModal = (product = null) => {
    if (product) {
      setSelectedProduct(product);
      setFormData({
        name: product.name || "",
        slug: product.slug || "",
        category: product.category || "everyday-hijab",
        description: product.description || "",
        regularPrice: product.regularPrice || "",
        discountPrice: product.discountPrice || "",
        stock: product.stock || "",
        fabric: product.fabric || "",
        colors: product.colors ? product.colors.join(", ") : "",
        sizes: product.sizes ? product.sizes.join(", ") : "",
        images: product.images ? product.images.join(", ") : "",
      });
    } else {
      setSelectedProduct(null);
      setFormData({
        name: "",
        slug: "",
        category: "everyday-hijab",
        description: "",
        regularPrice: "",
        discountPrice: "",
        stock: "",
        fabric: "",
        colors: "",
        sizes: "",
        images: "",
      });
    }
    onOpen();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      regularPrice: Number(formData.regularPrice),
      discountPrice: formData.discountPrice ? Number(formData.discountPrice) : null,
      stock: Number(formData.stock),
      colors: formData.colors ? formData.colors.split(",").map((s) => s.trim()) : [],
      sizes: formData.sizes ? formData.sizes.split(",").map((s) => s.trim()) : [],
      images: formData.images ? formData.images.split(",").map((s) => s.trim()) : [],
    };

    const url = "/api/admin/products";
    const method = selectedProduct ? "PUT" : "POST";
    const bodyPayload = selectedProduct ? { ...payload, id: selectedProduct._id } : payload;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyPayload),
      });

      if (res.ok) {
        fetchProducts();
        onClose();
      } else {
        alert("Operation failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Product Management</h1>
          <p className="text-gray-500 text-sm">Add, update, or remove ROOTZ store items.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-forest text-white" startContent={<Plus size={18} />}>
          Add New Product
        </Button>
      </div>

      <div className="flex justify-between items-center gap-4">
        <Input
          placeholder="Search by product name..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          startContent={<Search size={18} className="text-gray-400" />}
          className="w-full sm:w-80"
        />
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><Spinner color="success" size="lg" /></div>
      ) : (
        <Table aria-label="Products Table">
          <TableHeader>
            <TableColumn>PRODUCT</TableColumn>
            <TableColumn>CATEGORY</TableColumn>
            <TableColumn>PRICE</TableColumn>
            <TableColumn>STOCK</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((p) => (
              <TableRow key={p._id}>
                <TableCell className="flex items-center gap-3">
                  <Image src={p.images[0] || "/placeholder.jpg"} alt={p.name} className="w-12 h-12 object-cover rounded-lg" />
                  <div>
                    <p className="font-semibold text-charcoal">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.brand || "ROOTZ"}</p>
                  </div>
                </TableCell>
                <TableCell className="capitalize">{p.category.replace("-", " ")}</TableCell>
                <TableCell>
                  <span className="font-bold text-forest">৳{p.discountPrice || p.regularPrice}</span>
                  {p.discountPrice && <span className="text-xs text-gray-400 line-through ml-2">৳{p.regularPrice}</span>}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full font-semibold ${p.stock > 5 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {p.stock} in stock
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button isIconOnly size="sm" variant="light" onClick={() => handleOpenModal(p)}>
                      <Edit size={16} className="text-gray-600" />
                    </Button>
                    <Button isIconOnly size="sm" variant="light" color="danger" onClick={() => handleDelete(p._id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Add / Edit Product Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit}>
              <ModalHeader>{selectedProduct ? "Edit Product" : "Add Product"}</ModalHeader>
              <ModalBody className="gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  <Input label="Slug" required value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="Category"
                    selectedKeys={[formData.category]}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <SelectItem key="everyday-hijab" value="everyday-hijab">Everyday Hijab</SelectItem>
                    <SelectItem key="salat-hijab" value="salat-hijab">Salat Hijab</SelectItem>
                    <SelectItem key="premium-silk" value="premium-silk">Premium Silk</SelectItem>
                  </Select>
                  <Input label="Fabric" value={formData.fabric} onChange={(e) => setFormData({ ...formData, fabric: e.target.value })} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Input label="Regular Price (BDT)" type="number" required value={formData.regularPrice} onChange={(e) => setFormData({ ...formData, regularPrice: e.target.value })} />
                  <Input label="Discount Price (BDT)" type="number" value={formData.discountPrice} onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })} />
                  <Input label="Stock" type="number" required value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
                </div>
                <Input label="Colors (comma separated)" placeholder="Rose Dust, Soft Beige, Emerald" value={formData.colors} onChange={(e) => setFormData({ ...formData, colors: e.target.value })} />
                <Input label="Sizes (comma separated)" placeholder="Free Size, L, XL" value={formData.sizes} onChange={(e) => setFormData({ ...formData, sizes: e.target.value })} />
                <Input label="Image URLs (comma separated)" placeholder="https://cloudinary.com/img1.jpg, https://..." value={formData.images} onChange={(e) => setFormData({ ...formData, images: e.target.value })} />
                <Input label="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>Cancel</Button>
                <Button type="submit" className="bg-forest text-white">Save Product</Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}