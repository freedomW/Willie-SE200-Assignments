// import { notFound } from 'next/navigation';
import { db } from '@/db';

type ExpenseShowPageProps = {
  params: {
    id: string;
  };
}

export default async function ExpensesShowPage(props: ExpenseShowPageProps) {
  const expenseItem = await db.expenseItem.findFirst({
    where: { id: parseInt(props.params.id) },
  });

  if (!expenseItem) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h1>ID not found</h1>
          <form action="/expenses" method="get" style={{ marginTop: '1rem' }}>
            <button type="submit" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
              Go Back to Expenses
            </button>
          </form>
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ minWidth: '300px', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>{expenseItem.item}</h1>
        <div>{expenseItem.description}</div>
      </div>
      <a href="/expenses" style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>
        Go Back to Expenses
      </a>
    </div>
  );
}
