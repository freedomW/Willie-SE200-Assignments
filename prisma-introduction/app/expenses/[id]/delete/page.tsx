import { redirect } from 'next/navigation';
import { db } from '../../../../db';
import { DeleteExpenseItem } from './actions';

export default async function DeleteExpenseItemPage({ params }: { params: { id: string } }) {
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
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ minWidth: '300px', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <h1 style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>Delete Expense Item</h1>
            <p style={{ textAlign: 'center' }}>Are you sure you want to delete the item "{expenseItem.item}"?</p>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem' }}>
            <form action={DeleteExpenseItem}>
                <input type="hidden" name="id" value={expenseItem.id} />
                <button type="submit" style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px' }}>
                Yes
                </button>
            </form>
            <a href="/expenses" style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: 'gray', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
                No
            </a>
            </div>
        </div>
        </div>
    );
}