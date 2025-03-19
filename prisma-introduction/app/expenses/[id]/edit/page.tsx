import { redirect } from 'next/navigation';
import { db } from '../../../../db';
import { EditExpenseItem } from './actions';

export default async function EditExpenseItemPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const expenseItem = await db.expenseItem.findUnique({
    where: { id: parseInt(resolvedParams.id) }
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
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ minWidth: '300px', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>Edit Expense Item</h1>
        <form action={EditExpenseItem}>
        <input type="hidden" name="id" value={expenseItem.id} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label htmlFor="item">Item: </label>
              <input type="text" id="item" name="item" defaultValue={expenseItem.item} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label htmlFor="description">Description: </label>
              <textarea id="description" name="description" style={{ resize: 'both' }} defaultValue={expenseItem.description} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button type="submit">Update Expense Item</button>
            </div>
          </div>
        </form>
      </div>
      <a href="/expenses" style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>
        Go Back to Expenses
      </a>
    </div>
  );
}