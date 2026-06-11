import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
    component: Register,
    head: () => ({ meta: [{ title: "Register" }] }),
});

function Register() {
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setMessage('');
        if (password !== confirm) {
            setMessage('Passwords do not match');
            return;
        }
        try {
            const API = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';
            const res = await fetch(`${API}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullname, email, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Register failed');
            setMessage('Registered successfully. Redirecting to login...');
            setTimeout(() => navigate({ to: '/login' }), 800);
        } catch (err: any) {
            setMessage(err.message || 'Error');
        }
    }

    return (
        <main className="min-h-screen bg-background">
            <section className="container mx-auto max-w-2xl px-6 py-20">
                <form onSubmit={submit} className="mx-auto w-full max-w-md space-y-6 rounded-3xl border bg-card p-8" style={{ boxShadow: 'var(--shadow-glow)' }}>
                    <span className="inline-block rounded-full border border-foreground/15 bg-background/50 px-4 py-1 text-xs font-medium tracking-[0.2em] uppercase backdrop-blur">
                        Join the club
                    </span>
                    <h2 className="font-serif text-3xl font-semibold">Create an account</h2>
                    <div>
                        <label className="block text-sm">Full name</label>
                        <input required value={fullname} onChange={(e) => setFullname(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm">Email</label>
                        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm">Password</label>
                        <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm">Confirm Password</label>
                        <input required type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
                    </div>
                    <div>
                        <Button type="submit" className="rounded-full px-8" style={{ background: 'var(--primary-background)', color: 'var(--primary-foreground)' }}>
                            Register
                        </Button>
                    </div>
                    <div className="text-sm">
                        Already have an account? <a href="/login" className="text-primary">Login</a>
                    </div>
                    {message && <p className="text-sm text-muted-foreground">{message}</p>}
                </form>
            </section>
        </main>
    );
}
