"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Main() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const fontSize = 16;
        const columns = canvas.width / fontSize;

        const drops: number[] = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const characters = "01";

        function draw() {
            if (!ctx || !canvas) return;

            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#0F0";
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(
                    Math.floor(Math.random() * characters.length)
                );
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        }

        const intervalId = setInterval(draw, 33);

        function handleResize() {
            if (!canvas) return;

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-black">
            <canvas ref={canvasRef} className="w-full h-full" />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black bg-opacity-70 p-8 rounded-lg text-white max-w-2xl mx-4">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <img
                            src="/profile-picture.jpg"
                            alt="Profile"
                            className="w-48 h-48 rounded-full object-cover border-4 border-green-500"
                        />
                        <div>
                            <h1 className="text-4xl font-bold mb-4">Ibrahima Fall</h1>
                            <p className="text-xl mb-6">Junior Developer</p>
                            <div className="space-y-2">
                                <p>📧 Email: contact.ibrahima.fall@gmail.com</p>
                                <p>🔗 LinkedIn: <Link href={"https://www.linkedin.com/in/ibrahima-fall-b0922b323/" }>linkedin.com/in/ibrahima-fall-b0922b323</Link></p>
                                <p>💻 GitHub: <Link href={"https://github.com/ibousv"}>@ibousv </Link></p>
                                <p> 📍 Location: Dakar, Senegal</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
                        <p className="text-gray-300">
                            A passionate developer with experience in Backend development.
                            Specialized in Spring boot, React, and modern web technologies.
                            Always eager to learn and take on new challenges.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}