import { redirect } from 'next/navigation';
import { db } from '../../../db';

export default function CreateExpenseItemPage() {
  async function CreateExpenseItem(formData: FormData) {
    'use server';
    const item = formData.get('item') as string;
    const description = formData.get('description') as string;

    const expenseItem = await db.expenseItem.create({
      data: {
        item,
        description,
      },
    });
    console.log(expenseItem);

    redirect('/expenses');
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ minWidth: '300px', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>Create an Expense Item</h1>
        <form action={CreateExpenseItem}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label htmlFor="item">Item: </label>
              <input type="text" id="item" name="item" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label htmlFor="description">Description: </label>
              <textarea id="description" name="description" style={{ resize: 'both' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button type="submit">Create Expense Item</button>
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
