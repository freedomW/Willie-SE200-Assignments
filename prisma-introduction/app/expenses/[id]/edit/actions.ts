'use server';

import { redirect } from 'next/navigation';
import { db } from '../../../../db';



export async function EditExpenseItem(formData: FormData) {
    const id = parseInt(formData.get('id') as string);
    const item = formData.get('item') as string;
    const description = formData.get('description') as string;

    await db.expenseItem.update({
      where: { id: id},
      data: { item, description },
    });

    redirect('/expenses');
  };