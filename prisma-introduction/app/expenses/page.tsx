import { db } from "../../db";

export default async function Page() {

    const expenseItems = (await db.expenseItem.findMany()).toSorted((a, b) => a.id - b.id);
    const expenses = expenseItems.map((expenseItem) => ({
        id: expenseItem.id,
        item: expenseItem.item,
        description: expenseItem.description,
    }));

    return (
        <div>
            <style>{`
                div {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                table {
                    border-collapse: collapse;
                    width: 80%;
                    margin-top: 20px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: center;
                }
                th {
                    background-color: #f4f4f4;
                }
                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
                tr:hover {
                    background-color: #f1f1f1;
                }
                a {
                    color: blue;
                    text-decoration: underline;
                    cursor: pointer;
                }
                .actions {
                    display: flex;
                    gap: 10px;
                    justify-content: center;
                }
                .new-expense {
                    margin-top: 20px;
                }
            `}</style>
            <h1>Expenses</h1>
            <a href="/expenses/new" className="new-expense">Add New Expense</a>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Item</th>
                        <th>Description</th>
                        <th style={{ width: "8%" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense.id}>
                            <td>{expense.id}</td>
                            <td>{expense.item}</td>
                            <td>{expense.description}</td>
                            <td className="actions">
                                <a href={`/expenses/${expense.id}/edit`}>Edit</a>
                                <a href={`/expenses/${expense.id}/delete`}>Delete</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};