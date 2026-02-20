
import Link from 'next/link';

// This is a placeholder component for the portfolio listing page.
// You can fetch and display a list of portfolio items here.

const portfolioItems = [
  { id: 'project-1', title: 'Project One' },
  { id: 'project-2', title: 'Project Two' },
  { id: 'project-3', title: 'Project Three' },
];

export default function PortfolioPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Portfolio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioItems.map(item => (
          <Link href={`/portfolio/${item.id}`} key={item.id}>
            <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold">{item.title}</h2>
              <p>Click to see details</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
