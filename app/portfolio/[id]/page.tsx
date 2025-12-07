
import { notFound } from 'next/navigation';

// This is a placeholder component for a single portfolio item page.
// You can fetch portfolio item data based on the id here.

export async function generateStaticParams() {
  // Return a list of possible id values
  return [{ id: 'project-1' }, { id: 'project-2' }];
}

export default function PortfolioItemPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // For now, we'll just display the id.
  // In a real application, you would fetch data based on the id
  // and return a 404 if the item is not found.

  if (!id) {
    return notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Portfolio Project</h1>
      <p>This is the page for portfolio project with ID: <strong>{id}</strong>.</p>
      <p>You can fetch the content for this project and display it here.</p>
    </main>
  );
}
