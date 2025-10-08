export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Kibo Sandbox</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-4">Welcome to the Developer Sandbox</h2>
        <p className="text-lg mb-4">
          This is a learning environment for experimenting with Next.js, React, and Kibo Commerce APIs.
        </p>
        <p className="text-gray-600">
          Start building by adding components and features to this page!
        </p>
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>Kibo Sandbox © 2025</p>
        </div>
      </footer>
    </div>
  );
}