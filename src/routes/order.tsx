import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/order")({
    component: Order,
    head: () => ({ meta: [{ title: "Make It Yours" }] }),
});

function Order() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [size, setSize] = useState('M');
    const [quantity, setQuantity] = useState(1);
    const [notes, setNotes] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setMessage('');
        try {
            const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({ name, email, address, size, quantity, notes }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Order failed');
            setMessage('Order placed successfully');
            setTimeout(() => navigate({ to: '/' }), 800);
        } catch (err: any) {
            setMessage(err.message || 'Error');
        }
    }

    return (
        <main className="min-h-screen bg-background">
            <section className="container mx-auto max-w-2xl px-6 py-20">
                <form onSubmit={submit} className="mx-auto w-full max-w-lg space-y-6 rounded-3xl border bg-card p-8" style={{ boxShadow: 'var(--shadow-glow)' }}>
                    <span className="inline-block rounded-full border border-foreground/15 bg-background/50 px-4 py-1 text-xs font-medium tracking-[0.2em] uppercase backdrop-blur">
                        Order form
                    </span>
                    <h2 className="font-serif text-3xl font-semibold">Make It Yours</h2>
                    <div>
                        <label className="block text-sm">Name</label>
                        <input required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm">Email</label>
                        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm">Address</label>
                        <textarea required value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm">Size</label>
                            <select value={size} onChange={(e) => setSize(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2">
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm">Quantity</label>
                            <input type="number" min={1} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="mt-1 w-full rounded-md border px-3 py-2" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm">Notes</label>
                        <input value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
                    </div>
                    <div>
                        <Button type="submit" className="rounded-full px-8" style={{ background: 'var(--primary-background)', color: 'var(--primary-foreground)' }}>
                            Place Order
                        </Button>
                    </div>
                    {message && <p className="text-sm text-muted-foreground">{message}</p>}
                </form>
            </section>
        </main>
    );
}
