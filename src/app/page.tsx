import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <main className="flex flex-col items-center justify-between w-full flex-1 text
          text-center">
          <h1 className="text-6xl font-bold">Welcome to CV Generator</h1>
          <p className="mt-3 text-2xl">
            Generate your CV with ease using our tool.
          </p>
          <div className="mt-6">
            <Image
              src="/cv-generator.png"
              alt="CV Generator"
              width={500}
              height={300}
            />
          </div>
          <p className="mt-6 text-lg">
            Start creating your professional CV now!
          </p>
          <Link href="/cv" className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Create Your CV
          </Link>
          <p className="mt-6 text-sm text-gray-500">
            This is a simple CV generator built with Next.js and React.
          </p>
        </main>
        <footer className="flex items-center justify-center w-full h-24 border-t">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} CV Generator. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
