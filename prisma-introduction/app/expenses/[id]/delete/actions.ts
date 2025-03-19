'use server';

import { redirect } from 'next/navigation';
import { db } from '../../../../db';

export async function DeleteExpenseItem(formData: FormData) {
  const id = parseInt(formData.get('id') as string);
  
  await db.expenseItem.delete({
    where: { id },
  });

  redirect('/expenses');
}